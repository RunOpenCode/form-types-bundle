<?php

namespace RunOpenCode\FormTypes\Form\Type;

use RunOpenCode\FormTypes\Form\Utils\Prop;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\Exception\OptionDefinitionException;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class SwitchType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $configuration = [];
        $keys          = [
            'label_checked',
            'label_unchecked',
            'required',
            'disabled',
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
        $resolver->setDefault('readonly', null);
        $resolver->setAllowedTypes('readonly', ['bool', 'null']);

        $resolver->setDefault('label_checked', null);
        $resolver->setAllowedTypes('label_checked', ['string', 'null']);

        $resolver->setDefault('label_unchecked', null);
        $resolver->setAllowedTypes('label_unchecked', ['string', 'null']);

        $resolver->setNormalizer('label_unchecked', function(Options $options, $value) {
            if (null === $value && null === $options['label_checked']) {
                return null;
            }

            if (null !== $value && null !== $options['label_checked']) {
                return $value;
            }

            throw new OptionDefinitionException('Options "label_checked" and "label_unchecked" must be either null or not null simultaneously.');
        });
    }

    public function getParent(): string
    {
        return CheckboxType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'runopencode_switch_type';
    }
}
