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

export const LoadImageFailedIcon = URL.createObjectURL(
  new Blob(
    [
      `<svg
        class="svg-icon"
        style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0m42.666667 0l938.666666 0q42.666667 0 42.666667 42.666667l0 938.666666q0 42.666667-42.666667 42.666667l-938.666666 0q-42.666667 0-42.666667-42.666667l0-938.666666q0-42.666667 42.666667-42.666667Z"
          fill="#F7F7F7"
        />
        <path
          d="M795.136 320.256a29.226667 29.226667 0 0 0-20.437333-9.386667l-222.378667-8.746666-16.853333 37.12 23.168 69.888-41.856 79.488 17.066666 64 42.24 54.954666 61.184-56.576a14.72 14.72 0 0 1 20.736 0.853334l78.72 85.162666a14.848 14.848 0 0 1 2.56 16.128 14.762667 14.762667 0 0 1-13.909333 8.533334l-215.68-8.448-10.752 30.890666 11.648 27.904 247.978667 9.6a29.354667 29.354667 0 0 0 30.464-28.245333L802.858667 341.333333a29.013333 29.013333 0 0 0-7.722667-21.077333z m-159.36 161.408a44.074667 44.074667 0 1 1 3.456-88.021333 44.074667 44.074667 0 0 1-3.456 88.021333z m-159.872 202.965333l7.466667-32.426666-175.146667 12.074666a14.677333 14.677333 0 0 1-12.117333-24.32l129.792-149.034666a14.677333 14.677333 0 0 1 21.632-0.512l43.434666 45.312-18.688-48.298667 32.938667-83.370667-30.378667-66.730666 12.672-38.656-238.848 16.469333a29.312 29.312 0 0 0-27.221333 31.36l24.234667 351.573333a29.013333 29.013333 0 0 0 9.941333 20.053334c5.888 5.077333 13.568 7.68 21.333333 7.168l213.248-14.72-14.293333-25.941334z"
          fill="#CCCDCF"
        />
      </svg>`,
    ],
    { type: "image/svg+xml" }
  )
);
