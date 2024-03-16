/* eslint-disable react/prop-types */
import styled from "styled-components";

const LegendTextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
`;

const LegendText = styled.span`
  font-size: 30px;
  font-weight: 900;
  color: black;
`;

const LegendTextEng = styled.span`
  color: gray;
  font-weight: bold;
`;

const LegendContainer = styled.div`
  position: absolute;
  right: 20px;
  top: ${(props) => props.top || "20px"};
  padding: 55px;
  borderradius: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 10;
`;

const ColorIndicator = styled.div`
  width: 30px;
  height: 10px;
  background-color: ${(props) => props.color};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  margin-left: ${(props) => props.marginLeft || "15px"};
  font-size: ${(props) => props.fontSize || "20px"};
  font-weight: bold;
  color: black;
`;

const GradientBar = styled.div`
  height: 20px;
  width: 100%;
  background-image: linear-gradient(to right, red, blue);
  margin-bottom: 10px;
`;

const ColorLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

const Legend = () => {
  const items = [
    { color: "#F05650", label: "유동인구 상위 10퍼센트" },
    { color: "#5858EE", label: "유동인구 하위 30퍼센트" },
    { color: "#808080", label: "속해있지 않은 나머지" },
  ];

  return (
    <>
      <LegendContainer>
        <LegendTextContainer>
          <LegendText>범례(마커)</LegendText>
          <LegendTextEng>Legend - Marker</LegendTextEng>
        </LegendTextContainer>

        {items.map((item) => (
          <LegendItem key={item.label}>
            <ColorIndicator color={item.color} />
            <Label>{item.label}</Label>
          </LegendItem>
        ))}
      </LegendContainer>
      <LegendContainer top="350px">
        <LegendTextContainer>
          <LegendText>범례(히트맵)</LegendText>
          <LegendTextEng>Legend - Heatmap</LegendTextEng>
        </LegendTextContainer>

        <GradientBar />
        <ColorLabel>
          <Label marginLeft="0" fontSize="16px">
            유동인구 많음
          </Label>
          <Label fontSize="16px">유동인구 적음</Label>
        </ColorLabel>
      </LegendContainer>
    </>
  );
};

export default Legend;
