<?php

namespace RunOpenCode\FormTypes\Form\DataTransformer;

use RunOpenCode\FormTypes\Contract\DateRangeInterface;
use RunOpenCode\FormTypes\Type\DateRange;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

final class DateRangeToArrayTransformer implements DataTransformerInterface
{
    /**
     * @var array
     */
    private $fields;

    public function __construct(array $fields = null)
    {
        if (null === $fields) {
            $fields = ['from', 'to'];
        }

        $this->fields = $fields;
    }

    /**
     * {@inheritdoc}
     */
    public function transform($dateRange): array
    {
        if (null === $dateRange) {
            return array_combine($this->fields, [null, null]);
        }

        if (!$dateRange instanceof DateRangeInterface) {
            throw new TransformationFailedException(sprintf('Expected instance of "%s", got "%s".', DateRangeInterface::class, \is_object($dateRange) ? \get_class($dateRange) : \gettype($dateRange)));
        }

        return array_combine($this->fields, [$dateRange->getFrom(), $dateRange->getTo()]);
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($value): ?DateRangeInterface
    {
        if (null === $value) {
            return null;
        }

        if (!\is_array($value)) {
            throw new TransformationFailedException('Expected an array.');
        }

        $from = $value[$this->fields[0]];
        $to   = $value[$this->fields[1]];

        if (null === $from && null === $to) {
            return null;
        }

        if (!(null !== $from && null !== $to)) {
            throw new TransformationFailedException('Field value is missing.');
        }

        if (!$from instanceof \DateTimeInterface || !$to instanceof \DateTimeInterface) {
            throw new TransformationFailedException(sprintf('Provided values are not instance of "%s".', \DateTimeInterface::class));
        }

        try {
            return new DateRange($from, $to);
        } catch (\Exception $exception) {
            throw new TransformationFailedException($exception->getMessage(), $exception->getCode(), $exception);
        }
    }
}
