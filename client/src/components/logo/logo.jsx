import {forwardRef} from "react";
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";

import {RouterLink} from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({disabledLink = false, sx, ...other}, ref) => {

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/assets/logo.svg"
    //     sx={{ width: 180, height: 'auto', cursor: 'pointer', ...sx }}
    //   />
    // );
    const logo = (
        <Box
            component="div"
            sx={{
                height: 30,
                display: 'inline-flex',
                ...sx,
            }}
        >
            <Typography style={{
                fontSize: '1rem',
                color: '#ff7f00',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
            }}>
                <span>Bông Tuyết Trắng</span>
            </Typography>
        </Box>
    );

    // const logo = (
    //   <Box
    //     ref={ref}
    //     component="div"
    //     sx={{
    //       width: 40,
    //       height: 40,
    //       display: 'inline-flex',
    //       ...sx,
    //     }}
    //     {...other}
    //   >
    //     <img src="./logo.svg" alt="logo" style={{ width: 40, height: 40 }} />
    //   </Box>
    // );

    if (disabledLink) {
        return logo;
    }

    return (
        <Link component={RouterLink} href="/" sx={{display: 'contents'}}>
            {logo}
        </Link>
    );
});

Logo.propTypes = {
    disabledLink: PropTypes.bool,
    sx: PropTypes.object,
};

export default Logo;
