import React, {PropsWithChildren} from 'react';
import { Text } from '@radix-ui/themes';

interface errorStyling {
    mb?: string;
}

const ErrorMessage = ({children, mb='2'} : PropsWithChildren<errorStyling>) => {
    if (!children) return null;

  return (
    <Text color='red' as='p' mb={mb}>
        {children}
    </Text>
  )
}

export default ErrorMessage