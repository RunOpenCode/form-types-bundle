<?php

namespace RunOpenCode\FormTypes\Form\Type;

use RunOpenCode\FormTypes\Type\DateRange;
use RunOpenCode\FormTypes\Form\Utils\Prop;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
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
            'required'    => $options['required'] ?? true,
            'mapped'      => false,
            'placeholder' => '',
        ]);
        $builder->add('to', DateType::class, [
            'required'    => $options['required'] ?? true,
            'mapped'      => false,
            'placeholder' => '',
        ]);

        $builder->addEventListener(FormEvents::POST_SET_DATA, \Closure::bind(function(FormEvent $event) {
            $this->onPostSetData($event);
        }, $this));

        $builder->addEventListener(FormEvents::SUBMIT, \Closure::bind(function(FormEvent $event) {
            $this->onSubmit($event);
        }, $this));
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $configuration = [];
        $keys          = [
            'format',
            'number_of_months',
            'buttons',
            'disable_weekends',
            'min_date',
            'max_date',
            'min_days',
            'max_days',
            'required',
            'disabled',
        ];

        foreach ($keys as $key) {

            if (null !== $options[$key]) {
                $configuration[$key] = Prop::value($options[$key]);
            }
        }

        $view->vars['configuration'] = $configuration;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefault('format', null);
        $resolver->setAllowedTypes('format', ['null', 'string']);

        $resolver->setDefault('number_of_months', null);
        $resolver->setAllowedTypes('number_of_months', ['null', 'int']);
        $resolver->setAllowedValues('number_of_months', function($value) {
            if (null === $value) {
                return true;
            }

            return $value >= 1;
        });

        $resolver->setDefault('buttons', null);
        $resolver->setAllowedTypes('buttons', ['null', 'bool']);

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

        $resolver->setDefault('readonly', null);
        $resolver->setAllowedTypes('readonly', ['null', 'bool']);
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix(): string
    {
        return 'runopencode_date_range_type';
    }

    private function onPostSetData(FormEvent $event): void
    {
        /**
         * @var \RunOpenCode\FormTypes\Type\DateRange
         */
        $data = $event->getData();

        if (null === $data) {
            return;
        }

        $form = $event->getForm();

        $form->get('from')->setData($data->from());
        $form->get('to')->setData($data->to());
    }

    private function onSubmit(FormEvent $event): void
    {
        $form = $event->getForm();
        $from = $form->get('from')->getData();
        $to   = $form->get('to')->getData();

        if (null !== $from && null !== $to) {
            $event->setData(new DateRange($from, $to));

            return;
        }

        $event->setData(null);
    }
}
