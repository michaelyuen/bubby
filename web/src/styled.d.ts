// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    color: any;
    spacing: any;
    grid: any;
    font: any;
  }
}
