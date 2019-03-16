<?php

namespace RunOpenCode\FormTypes\Contract;

interface TimezoneAwareInterface
{
    public function getTimezone(): \DateTimeZone;
}
