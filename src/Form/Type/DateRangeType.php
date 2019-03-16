<?php

namespace RunOpenCode\FormTypes\Form\Type;

use RunOpenCode\FormTypes\Type\DateRange;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

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
