<?php

namespace RunOpenCode\FormTypes\Form\Utils;

final class Prop
{
    private function __construct()
    {
        // noop
    }

    public static function name(string $key): string
    {
        return str_replace('_', '-', $key);
    }

    public static function value($value): string
    {
        if (null === $value) {
            return null;
        }

        if (\is_numeric($value)) {
            return (string) $value;
        }

        if (\is_bool($value)) {
            return $value ? 'true' : 'false';
        }

        if (\is_string($value)) {
            return $value;
        }

        throw new \RuntimeException(sprintf('Unexpected value type "%s".', gettype($value)));
    }
}
