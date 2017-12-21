import ThemeDefault from '../../theming/themes/theme-default';
import ThemeLight from '../../theming/themes/theme-light';
import ThemeBlue from '../../theming/themes/theme-blue';
import ThemeGray from '../../theming/themes/theme-gray';
import ThemeDarkBlue from '../../theming/themes/theme-dark-blue';

const updateContentDimensions = () => {
  const body = document.querySelector('body');
  const element = document.querySelector('.main-container');
  const height = window.innerHeight;

  if (element) {
    element.style.minHeight = `${height - 100}px`;
  }

  body.style.overflowY = 'auto';
};

const getCurrentTheme = currentTheme => {
  let muiTheme;
  switch (currentTheme) {
    case 'lightTheme':
      muiTheme = ThemeLight;
      break;
    case 'blueTheme':
      muiTheme = ThemeBlue;
      break;
    case 'grayTheme':
      muiTheme = ThemeGray;
      break;
    case 'darkBlueTheme':
      muiTheme = ThemeDarkBlue;
      break;
    default:
      muiTheme = ThemeDefault;
      break;
  }
  return muiTheme;
};

export { updateContentDimensions, getCurrentTheme };
