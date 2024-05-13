import React from "react";
import {
  WebStyleHBrand,
  WebStyleHBrandContainer,
  WebStyleHBrandTypography,
  SKDS_Strong,
  WebStyleHeader,
  WebStyleH_ActionsList,
  WebStyleH_ul,
  WebStyleH_li,
  WebStyleH_a,
} from "./styled.webHeader";
import skBrowserIcon from "../../../../SkyBrowser.png";

export const WebHeaderComponent: React.FC = () => {
  return (
    <WebStyleHeader>
      <WebStyleHBrandContainer>
        <WebStyleHBrand src={skBrowserIcon} />
        <WebStyleHBrandTypography>
          Skye
          <SKDS_Strong>Browser</SKDS_Strong>
        </WebStyleHBrandTypography>
      </WebStyleHBrandContainer>

      <WebStyleH_ActionsList>
        <WebStyleH_ul>
          <WebStyleH_li>
            <WebStyleH_a href="#" className="">
              Versions
            </WebStyleH_a>
          </WebStyleH_li>
          <WebStyleH_li>
            <WebStyleH_a
              href=""
              className="disable"
              onDragStart={e => e.preventDefault()}
              onClick={e => e.preventDefault()}
            >
              Donwload
            </WebStyleH_a>
          </WebStyleH_li>
          <WebStyleH_li>
            <WebStyleH_a
              href=""
              className="disable"
              onDragStart={e => e.preventDefault()}
              onClick={e => e.preventDefault()}
            >
              About
            </WebStyleH_a>
          </WebStyleH_li>
          <WebStyleH_li>
            <WebStyleH_a
              href=""
              className="disable"
              onDragStart={e => e.preventDefault()}
              onClick={e => e.preventDefault()}
            >
              Browser
            </WebStyleH_a>
          </WebStyleH_li>
          <WebStyleH_li>
            <WebStyleH_a
              href="#"
              className="disable"
              onDragStart={e => e.preventDefault()}
            >
              Contributors
            </WebStyleH_a>
          </WebStyleH_li>
        </WebStyleH_ul>
      </WebStyleH_ActionsList>
    </WebStyleHeader>
  );
};
