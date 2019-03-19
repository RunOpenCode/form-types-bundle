<?php

namespace RunOpenCode\FormTypes\Form\Type;

use RunOpenCode\FormTypes\Form\Utils\Prop;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType as SymfonyChoiceType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class ChoiceType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $configuration = [];
        $keys          = [
            'required',
            'disabled',
            'display',
            'placeholder',
            'search_placeholder',
        ];

        foreach ($keys as $key) {

            if (null !== $options[$key]) {
                $value                           = $options[$key];
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
        $resolver->setDefault('display', 20);
        $resolver->setAllowedTypes('display', ['int', 'null']);
        $resolver->setAllowedValues('display', function($value) {
            if (null === $value) {
                return true;
            }

            return $value > 0;
        });

        $resolver->setDefault('search_placeholder', null);
        $resolver->setAllowedTypes('search_placeholder', ['null', 'string']);
    }

    /**
     * {@inheritdoc}
     */
    public function getParent(): string
    {
        return SymfonyChoiceType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'runopencode_choice_type';
    }
}
