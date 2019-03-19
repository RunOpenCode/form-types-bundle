<?php

namespace RunOpenCode\FormTypes\DependencyInjection;

use RunOpenCode\FormTypes\Form\Extension\NoValidateExtension;
use RunOpenCode\FormTypes\Form\Extension\TimezoneExtension;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension as BundleExtension;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;

final class Extension extends BundleExtension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container): void
    {
        $configuration = new Configuration();
        $config        = $this->processConfiguration($configuration, $configs);

        $loader = new XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.xml');

        $this->configureFormExtensions($config['extensions'], $container);
    }

    /**
     * {@inheritdoc}
     */
    public function getAlias(): string
    {
        return 'runopencode_form_types';
    }

    /**
     * {@inheritdoc}
     */
    public function getNamespace(): string
    {
        return 'http://www.runopencode.com/xsd-schema/form-types';
    }

    /**
     * {@inheritdoc}
     */
    public function getXsdValidationBasePath(): string
    {
        return __DIR__.'/../Resources/config/schema';
    }

    private function configureFormExtensions(array $configuration, ContainerBuilder $container): void
    {
        if (!$configuration['novalidate']) {
            $container->removeDefinition(NoValidateExtension::class);
        }

        if (!$configuration['timezone_aware']['enabled']) {
            $container->removeDefinition(TimezoneExtension::class);
        } else {
            $timezoneExtension = $container->findDefinition(TimezoneExtension::class);
            $timezoneExtension->setArgument(1, $configuration['timezone_aware']['model_timezone']);
        }
    }
}
