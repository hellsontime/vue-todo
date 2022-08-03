<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {   $dateValues = [$this->faker->dateTimeBetween('now', '+2 months', 'Europe/Moscow'), null];
        return [
            'title' => $this->faker->sentence,
            'date' => $dateValues[array_rand($dateValues)],
            'status' => $this->faker->boolean(),
        ];
    }
}
