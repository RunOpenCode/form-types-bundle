<?php

namespace RunOpenCode\FormTypes\Type;

use RunOpenCode\FormTypes\Contract\DateRangeInterface;

final class DateRange implements DateRangeInterface
{
    /**
     * @var \DateTimeInterface
     */
    private $from;

    /**
     * @var \DateTimeInterface
     */
    private $to;

    public function __construct(\DateTimeInterface $from, \DateTimeInterface $to)
    {
        if ($from > $to) {
            throw new \InvalidArgumentException('Date from must be before to date to.');
        }

        $this->from = clone $from;
        $this->to   = clone $to;
    }

    public function getFrom(): \DateTimeInterface
    {
        return clone $this->from;
    }

    public function getTo(): \DateTimeInterface
    {
        return clone $this->to;
    }

    public function toString(): string
    {
        return sprintf('%s - %s', $this->from->format(\DateTime::ATOM), $this->to->format(\DateTime::ATOM));
    }

    public function __clone()
    {
        $this->from = clone $this->from;
        $this->to   = clone $this->to;
    }

    public static function createFromFormat(string $value, string $format = \DateTime::ATOM, string $separator = '-'): self
    {
        [$fromString, $toString] = array_map('trim', explode($separator, $value));

        $from = \DateTime::createFromFormat($format, $fromString);
        $to   = \DateTime::createFromFormat($format, $toString);

        return new self($from, $to);
    }
}
