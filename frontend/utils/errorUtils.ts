import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";

export function parseGraphQlErrors(errors?: readonly GraphQLError[]) {
    if (errors && errors.length > 0) {
        let errorMessage = '';

        for (let i = 0; i < errors.length; i++) {
            const e = errors[i];
            errorMessage += e.message + '\n';
        }

        return errorMessage;
    }

    return 'An unknown error occurred';
}
export function parseErrorMessage(err: ApolloError) {
    if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        let errorMessage = '';

        for (let i = 0; i < err.graphQLErrors.length; i++) {
            const e = err.graphQLErrors[i];
            errorMessage += e.message + '\n';
        }

        return errorMessage;
    }

    if (err.clientErrors && err.clientErrors.length > 0) {
        let errorMessage = '';

        for (let i = 0; i < err.clientErrors.length; i++) {
            const e = err.clientErrors[i];
            errorMessage += e.message + '\n';
        }

    }

    if (err.networkError) {
       return err.networkError.message;
    }

    if (err.message) {
        return err.message
    }

    return 'An unknown error occurred';
}