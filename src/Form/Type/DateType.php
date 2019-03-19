<?php

namespace RunOpenCode\FormTypes\Form\Type;

use RunOpenCode\FormTypes\Form\Utils\Prop;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType as SymfonyDateType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class DateType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $configuration = [];
        $keys          = [
            'date_format',
            'disable_weekends',
            'min_date',
            'max_date',
            'required',
            'disabled',
            'readonly',
            'placeholder',
        ];

        foreach ($keys as $key) {

            if (null !== $options[$key]) {
                $value = $options[$key];

                if ('placeholder' === $key) {
                    $value = array_values($value)[0];
                }

                $configuration[Prop::name($key)] = Prop::value($value);
            }
        }

        $configuration['id']         = $view->vars['id'];
        $view->vars['id']            = null;
        $view->vars['configuration'] = $configuration;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefault('placeholder', '');

        $resolver->setDefault('date_format', null);
        $resolver->setAllowedTypes('date_format', ['null', 'string']);

        $resolver->setDefault('theme', null);
        $resolver->setAllowedTypes('theme', ['string', 'null']);

        $resolver->setDefault('disable_weekends', null);
        $resolver->setAllowedTypes('disable_weekends', ['null', 'bool']);

        $resolver->setDefault('min_date', null);
        $resolver->setAllowedTypes('min_date', ['null', \DateTimeInterface::class]);
        $resolver->setNormalizer('min_date', function(Options $options, $value) {
            if (null === $value) {
                return $value;
            }

            return $value->format(\DateTime::ATOM);
        });

        $resolver->setDefault('max_date', null);
        $resolver->setAllowedTypes('max_date', ['null', \DateTimeInterface::class]);
        $resolver->setNormalizer('max_date', function(Options $options, $value) {
            if (null === $value) {
                return $value;
            }

            return $value->format(\DateTime::ATOM);
        });

        $resolver->setDefault('readonly', null);
        $resolver->setAllowedTypes('readonly', ['null', 'bool']);
    }

    /**
     * {@inheritdoc}
     */
    public function getParent(): string
    {
        return SymfonyDateType::class;
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix(): string
    {
        return 'runopencode_date_type';
    }
}
