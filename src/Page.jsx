import React from 'react';
import { Box } from 'grommet';

const Page = ({ children, background }) => (
  <Box align="center" background={background}>
    <Box>
      <Box margin={{ top: 'large' }}>{children}</Box>
    </Box>
  </Box>
);

Page.propTypes = Box.propTypes;

export default Page;
