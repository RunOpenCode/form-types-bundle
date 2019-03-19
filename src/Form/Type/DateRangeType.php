<?php

namespace RunOpenCode\FormTypes\Form\Type;

use RunOpenCode\FormTypes\Form\DataTransformer\DateRangeToArrayTransformer;
use RunOpenCode\FormTypes\Form\Utils\Prop;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class DateRangeType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('from', DateType::class, [
            'required'       => $options['required'] ?? true,
            'mapped'         => false,
            'placeholder'    => '',
            'model_timezone' => $options['model_timezone'],
            'view_timezone'  => $options['view_timezone'],
        ]);
        $builder->add('to', DateType::class, [
            'required'       => $options['required'] ?? true,
            'mapped'         => false,
            'placeholder'    => '',
            'model_timezone' => $options['model_timezone'],
            'view_timezone'  => $options['view_timezone'],
        ]);

        $builder->addModelTransformer(new DateRangeToArrayTransformer());
    }

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
            'number_of_months',
            'min_days',
            'max_days',
        ];

        foreach ($keys as $key) {

            if (null !== $options[$key]) {
                $value                           = $options[$key];
                $configuration[Prop::name($key)] = Prop::value($value);
            }
        }

        $view->vars['configuration'] = $configuration;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefault('placeholder', '');
        $resolver->setDefault('by_reference', false);
        $resolver->setDefault('error_bubbling', false);
        $resolver->setDefault('data_class', null);

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

        $resolver->setDefault('number_of_months', null);
        $resolver->setAllowedTypes('number_of_months', ['null', 'int']);
        $resolver->setAllowedValues('number_of_months', function($value) {
            if (null === $value) {
                return true;
            }

            return $value >= 1;
        });

        $resolver->setDefault('min_days', null);
        $resolver->setAllowedTypes('min_days', ['null', 'int']);
        $resolver->setAllowedValues('min_days', function($value) {
            if (null === $value) {
                return true;
            }

            return $value >= 1;
        });

        $resolver->setDefault('max_days', null);
        $resolver->setAllowedTypes('max_days', ['null', 'int']);
        $resolver->setAllowedValues('max_days', function($value) {
            if (null === $value) {
                return true;
            }

            return $value >= 1;
        });

        $resolver->setDefault('model_timezone', null);
        $resolver->setAllowedTypes('model_timezone', ['null', 'string', \DateTimeZone::class]);

        $resolver->setDefault('view_timezone', null);
        $resolver->setAllowedTypes('view_timezone', ['null', 'string', \DateTimeZone::class]);
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix(): string
    {
        return 'runopencode_date_range_type';
    }
}
