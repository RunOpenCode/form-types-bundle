<?php

namespace RunOpenCode\FormTypes;

use RunOpenCode\FormTypes\DependencyInjection\Extension;
use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\Extension\Extension as BundleExtension;

final class FormTypesBundle extends Bundle
{
    public function getContainerExtension(): BundleExtension
    {
        return new Extension();
    }
}
