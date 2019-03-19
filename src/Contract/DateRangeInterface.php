<?php

namespace RunOpenCode\FormTypes\Contract;

interface DateRangeInterface
{
    public function getFrom(): \DateTimeInterface;

    public function getTo(): \DateTimeInterface;
}
