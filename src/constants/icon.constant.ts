export const CloseIcon = URL.createObjectURL(
  new Blob(
    [
      `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="480px"
        height="480px"
      >
        <path
          fill="#f44336"
          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
        />
        <path
          fill="#fff"
          d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
        />
        <path
          fill="#fff"
          d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
        />
      </svg>`,
    ],
    { type: "image/svg+xml" }
  )
);

export const LoadingIcon = URL.createObjectURL(
  new Blob(
    [
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="84" cy="50" r="10" fill="#e15b64">
          <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"/>
          <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#e15b64;#abbd81;#f8b26a;#f47e60;#e15b64" begin="0s"/>
      </circle><circle cx="16" cy="50" r="10" fill="#e15b64">
        <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>
        <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"/>
      </circle><circle cx="50" cy="50" r="10" fill="#f47e60">
        <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"/>
        <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"/>
      </circle><circle cx="84" cy="50" r="10" fill="#f8b26a">
        <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"/>
        <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"/>
      </circle><circle cx="16" cy="50" r="10" fill="#abbd81">
        <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"/>
        <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"/>
      </circle>
      </svg>`,
    ],
    { type: "image/svg+xml" }
  )
);

export const FlipIcon = URL.createObjectURL(
  new Blob(
    [
      `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" id="flip">
        <path fill="none" d="M0 0h48v48H0z"></path>
        <path
          fill="gray"
          d="M30 42h4v-4h-4v4zm8-24h4v-4h-4v4zM6 10v28c0 2.21 1.79 4 4 4h8v-4h-8V10h8V6h-8c-2.21 0-4 1.79-4 4zm32-4v4h4c0-2.21-1.79-4-4-4zM22 46h4V2h-4v44zm16-12h4v-4h-4v4zm-8-24h4V6h-4v4zm8 16h4v-4h-4v4zm0 16c2.21 0 4-1.79 4-4h-4v4z"
        ></path>
      </svg>`,
    ],
    { type: "image/svg+xml" }
  )
);
