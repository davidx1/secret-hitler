import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

768;
992;
1200;
1450;

const customViewports = {
  smallest: {
    name: "640x360",
    styles: {
      width: "640px",
      height: "360px"
    }
  },
  smaller: {
    name: "896x414",
    styles: {
      width: "896px",
      height: "414px"
    }
  },
  small: {
    name: "1024x768",
    styles: {
      width: "1024px",
      height: "768px"
    }
  },
  default: {
    name: "1366x768",
    styles: {
      width: "1366px",
      height: "768px"
    }
  },
  large: {
    name: "1440x900",
    styles: {
      width: "1440px",
      height: "900px"
    }
  },
  larger: {
    name: "1536x864",
    styles: {
      width: "1536px",
      height: "864px"
    }
  },
  largest: {
    name: "1920x1080",
    styles: {
      width: "1920px",
      height: "1080px"
    }
  }
};

addParameters({
  viewport: {
    viewports: customViewports
  }
});
