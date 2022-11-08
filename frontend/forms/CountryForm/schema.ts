import * as yup from 'yup';

export const CountryFormSchema = yup.object({
    area: yup.string().required(),
    country: yup.string().required().min(2),
    total_population: yup.string().required(),
    year: yup.string().required().min(4),
})

export type CountryFormState = yup.InferType<typeof CountryFormSchema>;