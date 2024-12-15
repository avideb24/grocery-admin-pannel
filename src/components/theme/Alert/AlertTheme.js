// utils/themeAlert.js
import Swal from 'sweetalert2';

const themeColors = {
    light: {
        background: '#fff',
        titleColor: '#333',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    },
    dark: {
        background: '#333',
        titleColor: '#fff',
        confirmButtonColor: '#4A90E2',
        cancelButtonColor: '#E74C3C',
    }
};

export const showAlertWithTheme = (options, isDarkMode) => {
    const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;
    return Swal.fire({
        background: currentTheme.background,
        color: currentTheme.titleColor,
        confirmButtonColor: currentTheme.confirmButtonColor,
        cancelButtonColor: currentTheme.cancelButtonColor,
        ...options
    });
};