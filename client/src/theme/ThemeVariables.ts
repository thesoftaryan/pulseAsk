
// This will come from your theme context / store
export const isDark = false;
export const color = {
  /* =========================
     Background
  ========================= */
  colorBg: isDark ? "#191919" : "#ffffff",
  colorLevel1Bg: isDark ? "#000000" : "#f8f8f8",
  colorLevel2Bg: isDark ? "#191919" : "#ffffff",

  /* =========================
     General Purpose
  ========================= */
  colorGold : "#FAA629",
  colorSilver: "#E6ECEF",
  colorBronze: "#CE7430",

  colorDanger: "#FE251B",
  colorOrange: "#FF8400",

  colorSuccess: "#28A745",
  colorSuccessLight: "#D4EDDA",

  colorError: "#DC3545",
  colorErrorLight: "#F8D7DA",
  
  colorWarning: "#FFC107",
  colorWarningLight: "#FFF3CD",

  colorInfo: "#0D6EFD",
  colorInfoLight: "#E7F1FF",


  /* =========================
     Primary
  ========================= */
  colorPrimary: isDark ? "#1aa5ae" : "#4458af",
  colorPrimaryLight: isDark ? "#51bfc6" : "#6A7BC4",
  colorPrimaryExtraLight: isDark ? "#a1e8ed" : "#a2addc",

  /* =========================
     Text
  ========================= */
  colorText: isDark ? "#ffffff" : "#000000",
  colorTextButton: "#ffffff",
  colorHeadingText: isDark ? "#ffffff" : "#000000",
  colorSubheadingText: isDark ? "#979797" : "#555555",

  /* =========================
     Input
  ========================= */
  colorInputArea: isDark ? "#000000" : "#f8f8f8",

  /* =========================
     Icon
  ========================= */
  colorGeneralIcon: isDark ? "#ffffff" : "#000000",

  /* =========================
     Border
  ========================= */
  colorBorder: "#555555",
};


export const size = {
  /* =========================
     Button & Input
  ========================= */
  sizeButtonHeight: "45px",
  sizeInputHeight: "45px",

  /* =========================
     Layout
  ========================= */
  sizeContainerWidth: "1200px",

  /* =========================
     Border Radius
  ========================= */
  sizeRadiusXsm: "4px",
  sizeRadiusSm: "8px",
  sizeRadiusMd: "16px",
  sizeRadiusLg: "24px",

  /* =========================
     Icon Size
  ========================= */
  sizeIconSm: "20px",
  sizeIconMd: "35px",
  sizeIconLg: "50px",
  sizeIconXl: "65px",

  /* =========================
     Checkbox Size
  ========================= */
  sizeCheckboxSm: "20px",
  sizeCheckboxMd: "25px",
  sizeCheckboxLg: "30px",
};


export const spacing = {
  spacingXs: "4px",
  spacingSm: "8px",
  spacingMd: "16px",
  spacingLg: "24px",
  spacingXl: "32px",
  spacingXxl: "48px",
  spacingXxxl: "64px",
  spacingXxxxl: "80px",
};


export const typography = {
  /* =========================
     Font Family
  ========================= */
  fontFamily: "'Inter', sans-serif",

  /* =========================
     Font Sizes
     (1rem = 16px)
  ========================= */
  fontSizeSm: "0.875rem",
  fontSizeMd: "1rem",
  fontSizeLg: "1.25rem",
  fontSizeXl: "1.5rem",
  fontSizeXxl: "2rem",

  /* =========================
     Font Weights
  ========================= */
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};
