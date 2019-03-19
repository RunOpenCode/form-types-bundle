<?php

namespace RunOpenCode\FormTypes\DependencyInjection;

use RunOpenCode\FormTypes\Contract\TimezoneAwareInterface;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;
use Symfony\Component\Security\Core\User\UserInterface;

final class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('runopencode_form_types');

        if (method_exists($treeBuilder, 'root')) {
            $treeBuilder->root('runopencode_form_types');
        }

        /**
         * @var \Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition $rootNode
         */
        $rootNode = $treeBuilder->getRootNode();

        $rootNode
            ->addDefaultsIfNotSet()
            ->children()
                ->arrayNode('extensions')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->booleanNode('novalidate')
                            ->info('Disable HTML5 validation for all forms and fields. Useful for testing and development purposes.')
                            ->defaultFalse()
                        ->end()
                        ->arrayNode('timezone_aware')
                            ->addDefaultsIfNotSet()
                            ->info(sprintf('Include automatic configuration of view/model timezone for "%s" instances which implements "%s" interface.', UserInterface::class, TimezoneAwareInterface::class))
                            ->children()
                                ->booleanNode('enabled')->defaultFalse()->end()
                                ->scalarNode('model_timezone')
                                    ->info('Use custom configured model timezone instead of system timezone.')
                                    ->defaultNull()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
