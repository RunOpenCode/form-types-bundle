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
     * @var bool
     */
    private $enabled;

    /**
     * @var \Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var \DateTimeZone
     */
    private $defaultTimezone;

    public function __construct(bool $enabled, TokenStorageInterface $tokenStorage, \DateTimeZone $defaultTimezone = null)
    {
        $this->enabled         = $enabled;
        $this->tokenStorage    = $tokenStorage;
        $this->defaultTimezone = $defaultTimezone ?? new \DateTimeZone(date_default_timezone_get());
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        if (false === $this->enabled) {
            return;
        }

        $token = $this->tokenStorage->getToken();

        if (null === $token) {
            return;
        }

        $user = $token->getUser();

        if (!$user instanceof TimezoneAwareInterface) {
            return;
        }

        $timezone = $user->getTimezone() ?: $this->defaultTimezone;

        $resolver->setDefault('view_timezone', $timezone);
        $resolver->setDefault('model_timezone', $this->defaultTimezone);
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
