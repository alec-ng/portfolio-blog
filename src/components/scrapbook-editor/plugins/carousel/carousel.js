import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import ItemsCarousel from "react-items-carousel";
import styled from "styled-components";

const NUM_CARDS_MOBILE = 1;
const DEFAULT_NUM_CARDS = 3;
const SIZES = {
  large: "80vw",
  medium: "60vw",
  small: "40vw"
};

const CarouselImage = styled.div`
  height: ${props => props.height}px;
  background: url(${props => props.urlSource});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const VARIATION_DEFAULT = "carousel_default";

export function CarouselElement(props) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  // determine how many cards to show at once
  let numCards = isMobile
    ? NUM_CARDS_MOBILE
    : props.baseAttrs.numCards > 0
    ? props.baseAttrs.numCards
    : DEFAULT_NUM_CARDS;

  // Generate images from attribute
  let imgList;
  let urlSources = props.baseAttrs.urlSources
    ? props.baseAttrs.urlSources.split("\n")
    : "";
  imgList =
    !urlSources || !urlSources[0]
      ? []
      : urlSources.map(urlSource => (
          <CarouselImage
            urlSource={urlSource}
            height={props.baseAttrs.height}
          />
        ));

  function NoItemsMessage(props) {
    return (
      <div className="p-3">
        <h5 className="text-center text-muted">
          Provide at least one image to show
        </h5>
      </div>
    );
  }

  let widthStyle = SIZES[props.baseAttrs.width];

  return (
    <>
      {imgList.length === 0 ? (
        <NoItemsMessage />
      ) : (
        <div
          style={{
            padding: "0 20px",
            margin: "0 auto",
            maxWidth: `${widthStyle}`
          }}
        >
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={"center"}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={numCards}
            slidesToScroll={1}
            outsideChevron={false}
            showSlither={true}
            firstAndLastGutter={true}
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            leftChevron={<button>{"<"}</button>}
            rightChevron={<button>{">"}</button>}
          >
            {imgList}
          </ItemsCarousel>
        </div>
      )}
    </>
  );
}
