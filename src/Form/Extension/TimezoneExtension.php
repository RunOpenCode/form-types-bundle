<?php

namespace RunOpenCode\FormTypes\Form\Extension;

use RunOpenCode\FormTypes\Contract\TimezoneAwareInterface;
use RunOpenCode\FormTypes\Form\Type\DateRangeType;
use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class TimezoneExtension extends AbstractTypeExtension
{

    /**
     * @var \Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var \DateTimeZone
     */
    private $modelTimezone;

    public function __construct(TokenStorageInterface $tokenStorage, $modelTimezone = null)
    {
        $modelTimezone = $modelTimezone ?? date_default_timezone_get();

        $this->tokenStorage  = $tokenStorage;
        $this->modelTimezone = \is_string($modelTimezone) ? new \DateTimeZone($modelTimezone) : $modelTimezone;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefault('model_timezone', $this->modelTimezone);

        $token = $this->tokenStorage->getToken();

        if (null === $token) {
            return;
        }

        $user = $token->getUser();

        if (!$user instanceof TimezoneAwareInterface) {
            return;
        }

        $timezone = $user->getTimezone() ?: $this->modelTimezone;

        $resolver->setDefault('view_timezone', $timezone);
    }

    public static function getExtendedTypes(): array
    {
        return [
            DateTimeType::class,
            DateType::class,
            TimeType::class,
            DateRangeType::class,
        ];
    }
}
