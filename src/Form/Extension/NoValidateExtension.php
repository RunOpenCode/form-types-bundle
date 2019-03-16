<?php

namespace RunOpenCode\FormTypes\Form\Extension;

use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;

/**
 * Remove HTML 5 validation from all form types.
 */
final class NoValidateExtension extends AbstractTypeExtension
{
    /**
     * @var bool
     */
    private $enabled;

    public function __construct(bool $enabled)
    {
        $this->enabled = $enabled;
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        if (true === $this->enabled) {

            $view->vars['attr'] = array_merge($view->vars['attr'], [
                'novalidate' => 'novalidate',
            ]);
        }
    }

    /**
     * {@inheritdoc}
     */
    public static function getExtendedTypes()
    {
        return [
            FormType::class
        ];
    }
}
