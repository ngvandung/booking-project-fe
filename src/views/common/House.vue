<template>
  <v-app id="common-house">
    <slide-show-house :images="houseImages" />
    <v-container>
      <v-row>
        <div style="width: 100%" class="d-flex justify-space-between align-lg-center">
          <div>
            <v-breadcrumbs :items="items" large></v-breadcrumbs>
          </div>
          <div class="d-flex align-lg-center">
            <v-btn small width="70" text @click="sharing">
              <span>Share</span>
              <span style="margin-left: 3px" class="material-icons">share</span>
            </v-btn>
            <v-btn :disabled="highLightVote" small width="70" text @click="voting">
              <span v-if="highLightVote" style="color: #e97575">Like</span>
              <span v-else>Like</span>
              <span
                v-if="highLightVote"
                style="margin-left: 3px; color: #e97575;"
                class="material-icons"
              >favorite_border</span>
              <span v-else style="margin-left: 3px" class="material-icons">favorite_border</span>
            </v-btn>
          </div>
        </div>
        <v-col cols="12" lg="8">
          <v-responsive class="infomation">
            <p class="font-weight-bold" style="font-size: 2rem;">{{house.name}}</p>
            <div>
              <p class="d-flex align-lg-center">
                <span class="material-icons">place</span>
                <span style="font-weight: 700;">{{house.villageName}}, {{house.districtName}}, {{house.cityName}}, {{house.stateName}}</span>
              </p>
              <p class="d-flex align-lg-center">
                <span class="material-icons">apartment</span>
                <span style="font-weight: 700;">{{house.typeName}} · </span><span>100m2</span>
              </p>
              <p
                class="d-flex align-lg-center"
              >{{house.maxGuest}} guests • {{house.livingroom}} Livingroom • {{house.bathroom}} Bathroom • {{house.bedroom}} Bedroom</p>
              <p style="margin-top: 30px;">{{house.description}}</p>
            </div>
            <p class="font-weight-bold" style="font-size: 1.75rem; margin-top: 30px">Amenities</p>
            <p style="margin: 0;">Amenities and services at the accommodation</p>
            <p class="font-weight-bold" style="font-size: 1.25rem; margin-top: 20px">Facilities</p>
            <div class="d-flex justify-space-between">
              <template v-if="house.isWifi || house.isOven || house.isAirConditioning">
                <v-col cols="12" lg="4">
                  <template v-if="house.isWifi">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><g fill="#000" fill-rule="nonzero"><path pid="0" d="M23.44 9.04a.502.502 0 01-.354-.146A14.9 14.9 0 0012.48 4.5 14.903 14.903 0 001.873 8.894a.5.5 0 01-.707-.707A15.896 15.896 0 0112.48 3.5c4.274 0 8.292 1.665 11.313 4.687a.5.5 0 01-.353.853z"></path><path pid="1" d="M20.612 11.868a.502.502 0 01-.354-.146c-4.289-4.288-11.268-4.288-15.557 0a.5.5 0 01-.707-.707c4.679-4.679 12.292-4.679 16.971 0a.5.5 0 01-.353.853z"></path><path pid="2" d="M17.783 14.697a.502.502 0 01-.354-.146 6.954 6.954 0 00-4.95-2.05c-1.87 0-3.627.728-4.95 2.05a.5.5 0 01-.707-.707 7.948 7.948 0 015.657-2.343c2.137 0 4.146.832 5.657 2.343a.5.5 0 01-.353.853zM12.48 20.5a2.503 2.503 0 01-2.5-2.5c0-1.378 1.122-2.5 2.5-2.5s2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path></g></svg>
                      <span style="padding: 0 5px;">Wifi</span>
                    </div>
                  </template>
                  <template v-if="house.isOven">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" fill="#000" fill-rule="nonzero" d="M16.293 14H8.707l-1.853 1.854a.5.5 0 01-.708-.708L7.293 14H3.5a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5h18a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-3.793l1.147 1.146a.5.5 0 01-.708.708L16.293 14zM4 3v10h17V3H4zM3 21.5v1a.5.5 0 11-1 0V18a1.5 1.5 0 011.5-1.5h18A1.5 1.5 0 0123 18v4.5a.5.5 0 11-1 0v-1H3zm0-1h19V18a.5.5 0 00-.5-.5h-18a.5.5 0 00-.5.5v2.5zm8.5-1a.5.5 0 110-1h2a.5.5 0 110 1h-2zM5.854 5.854a.5.5 0 11-.708-.708l1-1a.5.5 0 11.708.708l-1 1zm0 3a.5.5 0 11-.708-.708l4-4a.5.5 0 11.708.708l-4 4z"></path></svg>
                      <span style="padding: 0 5px;">Oven</span>
                    </div>
                  </template>
                  <template v-if="house.isAirConditioning">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" fill="#000" fill-rule="nonzero" d="M23 8.5h-2.085a1.5 1.5 0 01-2.83 0H1v4a.5.5 0 00.5.5h1v-.5A1.5 1.5 0 014 11h16a1.5 1.5 0 011.5 1.5v.5h1a.5.5 0 00.5-.5v-4zm0-1v-2a.5.5 0 00-.5-.5h-21a.5.5 0 00-.5.5v2h17.085a1.5 1.5 0 012.83 0H23zM20.5 13v-.5a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v.5h17zm-19-9h21A1.5 1.5 0 0124 5.5v7a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 12.5v-7A1.5 1.5 0 011.5 4zm5.886 16.182a.5.5 0 01-.772.636c-.817-.993-.817-2.086-.009-3.125.525-.674.525-1.248.009-1.875a.5.5 0 01.772-.636c.817.993.817 2.086.009 3.125-.525.674-.525 1.248-.009 1.875zm5 0a.5.5 0 01-.772.636c-.817-.993-.817-2.086-.009-3.125.525-.674.525-1.248.009-1.875a.5.5 0 01.772-.636c.817.993.817 2.086.009 3.125-.525.674-.525 1.248-.009 1.875zm5 0a.5.5 0 01-.772.636c-.817-.993-.817-2.086-.009-3.125.525-.674.525-1.248.009-1.875a.5.5 0 01.772-.636c.817.993.817 2.086.009 3.125-.525.674-.525 1.248-.009 1.875z"></path></svg>
                      <span style="padding: 0 5px;">Air-conditioning</span>
                    </div>
                  </template>
                </v-col>
              </template>
              <template v-if="house.isTowels || house.isSoap">
                <v-col cols="12" lg="4">
                  <template v-if="house.isTowels">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><g fill-rule="evenodd"><path pid="0" fill-rule="nonzero" d="M22.527 6.497h-.366v-.202c.107-1.298-.245-2.453-.993-3.254a3.18 3.18 0 00-2.443-1.024H3.945c-1.376 0-2.496 1.102-2.496 2.457v2.023h-.023C.64 6.497 0 7.127 0 7.901v.359c0 .774.64 1.403 1.426 1.403h.023v10.865c0 1.355 1.12 2.457 2.496 2.457h12.188c1.417 0 2.208-.28 2.646-.934.417-.624.421-1.51.421-2.537h1.757c.675 0 1.204-.67 1.204-1.524V9.663h.366c.787 0 1.426-.63 1.426-1.403V7.9c0-.773-.64-1.403-1.426-1.403zM1.45 8.742h-.023a.487.487 0 01-.49-.482V7.9c0-.265.22-.482.49-.482h.023v1.324zM21.225 6.36v.137H19.21c.043-.329.15-.593.314-.77a.773.773 0 01.577-.245c.39 0 .899.276 1.125.878zm-2.96 13.126c0 1.032-.019 1.686-.267 2.058-.162.242-.52.52-1.865.52H3.945c-.86 0-1.56-.69-1.56-1.536V18.05h15.88v1.435zm0-2.356H2.384v-1.98h15.88v1.98zm.572-12.028c-.307.327-.655.949-.573 2.057v7.07H2.384v-.88h4.578a.464.464 0 00.468-.46.465.465 0 00-.468-.461H2.385V4.474c0-.847.7-1.536 1.56-1.536h14.803a2.252 2.252 0 011.731.726c.298.32.513.72.638 1.18A2.001 2.001 0 0020.1 4.56c-.487 0-.935.192-1.263.541zm2.388 12.888c0 .396-.2.603-.268.603H19.2v-8.93h2.025v8.327zm1.793-9.73c0 .266-.22.482-.49.482H19.2V7.418h3.327c.27 0 .49.217.49.483v.359z"></path><path pid="1" d="M8.428 12.428h-.037a.464.464 0 00-.468.46c0 .255.21.461.468.461h.037a.464.464 0 00.468-.46.465.465 0 00-.468-.461z"></path></g></svg>
                      <span style="padding: 0 5px;">Towels</span>
                    </div>
                  </template>
                  <template v-if="house.isSoap">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><g fill-rule="evenodd"><path pid="0" d="M7.2 16.902a2.105 2.105 0 01-1.654-.57 1.804 1.804 0 01-.351-1.328.393.393 0 00-.331-.443.4.4 0 00-.458.315 2.576 2.576 0 00.526 1.96c.488.564 1.251.85 2.268.85.22 0 .4-.175.4-.392a.396.396 0 00-.4-.392zm2 0h-.4c-.22 0-.4.176-.4.392 0 .217.18.392.4.392h.4c.22 0 .4-.175.4-.392a.396.396 0 00-.4-.392zm7.6-5.49c.61-.059 1.215.15 1.654.569.288.381.414.858.351 1.329a.393.393 0 00.395.455.398.398 0 00.394-.328 2.573 2.573 0 00-.526-1.959c-.488-.564-1.251-.85-2.268-.85-.22 0-.4.175-.4.392 0 .216.18.392.4.392zm-1.2-.392a.396.396 0 00-.4-.393h-.4c-.22 0-.4.176-.4.393 0 .216.18.392.4.392h.4c.22 0 .4-.176.4-.392z"></path><path pid="1" fill-rule="nonzero" d="M2 9.451c1.104 0 2-.878 2-1.96 0-1.084-.896-1.962-2-1.962S0 6.407 0 7.49c.001 1.083.896 1.96 2 1.961zm0-3.137c.663 0 1.2.526 1.2 1.176 0 .65-.537 1.177-1.2 1.177-.663 0-1.2-.527-1.2-1.177S1.337 6.314 2 6.314zm8.8.392c0 .866.716 1.569 1.6 1.569.884 0 1.6-.703 1.6-1.57 0-.865-.716-1.568-1.6-1.568-.884 0-1.6.703-1.6 1.569zm2.4 0a.792.792 0 01-.8.784.792.792 0 01-.8-.784c0-.433.358-.784.8-.784.442 0 .8.35.8.784zM4.8 4.745c0 1.516 1.254 2.745 2.8 2.745 1.546 0 2.8-1.229 2.8-2.745S9.146 2 7.6 2c-1.546.002-2.798 1.23-2.8 2.745zm4.8 0c0 1.083-.896 1.96-2 1.96s-2-.877-2-1.96.896-1.96 2-1.96 1.999.878 2 1.96z"></path><path pid="2" d="M7.197 5.014a.722.722 0 01-.017-.54.39.39 0 00-.255-.495.402.402 0 00-.505.25c-.145.413-.1.867.127 1.243a1.22 1.22 0 001.053.45c.22 0 .4-.176.4-.393a.396.396 0 00-.4-.392.527.527 0 01-.403-.123z"></path><path pid="3" fill-rule="nonzero" d="M21.6 16.118a2.38 2.38 0 00-.431.042c.02-.144.03-.29.031-.435v-3.137c-.002-1.948-1.613-3.527-3.6-3.53H6.4c-1.987.003-3.598 1.582-3.6 3.53v3.137c.002 1.949 1.613 3.528 3.6 3.53h6.54a2.397 2.397 0 002.26 1.569c.349 0 .694-.076 1.008-.224A2.4 2.4 0 0018.4 22a2.4 2.4 0 002.192-1.4c.314.148.66.224 1.008.224 1.325 0 2.4-1.054 2.4-2.353 0-1.3-1.075-2.353-2.4-2.353zm-8.8 2.353H6.4c-1.546-.002-2.798-1.23-2.8-2.746v-3.137c.002-1.515 1.254-2.743 2.8-2.745h11.2c1.546.002 2.798 1.23 2.8 2.745v3.137c0 .086-.01.17-.018.253a2.409 2.409 0 00-2.196-1.028 2.39 2.39 0 00-1.978 1.39 2.375 2.375 0 00-1.008-.222c-1.325.001-2.399 1.054-2.4 2.353zm8.8 1.568a1.598 1.598 0 01-.988-.345.406.406 0 00-.387-.059.394.394 0 00-.253.294 1.588 1.588 0 01-1.57 1.286 1.588 1.588 0 01-1.57-1.286.395.395 0 00-.253-.294.406.406 0 00-.387.059c-.28.223-.63.345-.992.345-.884 0-1.6-.702-1.6-1.568 0-.867.716-1.569 1.6-1.569.36.001.708.123.988.345.11.085.256.107.387.06a.394.394 0 00.253-.295 1.588 1.588 0 011.57-1.285c.772 0 1.433.54 1.57 1.285a.395.395 0 00.253.294c.13.048.278.026.387-.059.28-.222.63-.344.992-.345.884 0 1.6.702 1.6 1.569 0 .866-.716 1.568-1.6 1.568z"></path></g></svg>
                      <span style="padding: 0 5px;">Soap</span>
                    </div>
                  </template>
                  <template v-if="true">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" d="M19.824 1.261L18.105 2.98l-3.273.399-.123.014-.096.068L2.745 12.99l-.014.014-.013.027-1.155 1.141-.303.317 8.25 8.25.317-.303 1.14-1.155.028-.014.014-.013 9.556-11.825.083-.097.014-.137.357-3.3 1.416-1.402.303-.317-2.915-2.915zm0 1.252L21.5 4.176l-.893.894-1.678-1.664.894-.894zm-1.692 1.36h.014l1.98 1.98v.014l-.234 2.324-4.056-4.056 2.296-.261zm-3.286.523l4.785 4.785-9.281 11.482-.027.04-.798.785-7.013-7.013.784-.797.042-.028 11.508-9.254zM12.11 8.824c-.555 0-1.102.235-1.526.66-.394.393-.518.844-.605 1.168-.047.17-.072.298-.138.413-.063.113-.136.23-.206.344-.345.548-.928 1.464-.206 2.186.178.179.399.3.632.344.045.233.164.45.344.632.22.22.52.344.839.344.488 0 .923-.282 1.347-.55.114-.07.23-.143.344-.206.115-.066.242-.091.412-.138.325-.087.776-.211 1.17-.605.905-.906.872-2.195-.07-3.135a2.62 2.62 0 00-.398-.33 2.62 2.62 0 00-.33-.399c-.47-.469-1.021-.728-1.609-.728zm0 .88c.337 0 .68.158.99.467.138.138.234.286.303.427.14.068.287.163.426.302.603.603.608 1.356.069 1.897-.392.392-.901.32-1.403.605-.455.26-.928.633-1.251.633a.303.303 0 01-.22-.082c-.155-.155-.143-.353.055-.55.273-.274.58-.686.825-1.046.093-.137-.028-.288-.165-.288a.148.148 0 00-.097.027c-.359.244-.773.552-1.044.825-.109.109-.217.165-.317.165a.332.332 0 01-.234-.11c-.287-.287.226-.897.55-1.471.286-.504.214-.999.606-1.389.262-.264.586-.412.907-.412zm-7.92 3.41l-.619.632.317.316.618-.632-.316-.316zm.646.646l-.632.619.316.316.632-.619-.316-.316zm.633.633l-.619.618.316.317.619-.62-.316-.316zm.632.632l-.619.633.317.316.619-.633-.317-.316zm.646.646l-.632.619.316.316.633-.619-.317-.316zm.633.633l-.619.619.316.316.62-.619-.317-.316zm.633.632l-.62.633.317.316.619-.633-.317-.316zm.646.647l-.633.618.316.317.633-.62-.316-.315zm.632.632l-.619.619.317.316.618-.619-.316-.316zm.633.633l-.619.632.316.316.619-.632-.316-.316zm.646.646l-.633.619.317.316.632-.619-.316-.316z" fill="#000" fill-rule="nonzero"></path></svg>
                      <span style="padding: 0 5px;">Napkins</span>
                    </div>
                  </template>
                </v-col>
              </template>
              <template v-if="house.isShampoo || house.Toiletries">
                <v-col cols="12" lg="4">
                  <template v-if="true">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" fill="#000" fill-rule="nonzero" d="M15.07 11.21a4.5 4.5 0 100 6.58c-2.093-1.832-2.093-4.748 0-6.58zm.651.759c-1.628 1.432-1.628 3.63 0 5.062A4.48 4.48 0 0016.5 14.5a4.48 4.48 0 00-.779-2.531zM10 1H4.5a.5.5 0 00-.5.5V5h6V1zm1 0v4h9V1.5a.5.5 0 00-.5-.5H11zM4 6v17h16V6H4zm.5-6h15A1.5 1.5 0 0121 1.5v22a.5.5 0 01-.5.5h-17a.5.5 0 01-.5-.5v-22A1.5 1.5 0 014.5 0zM12 20a5.5 5.5 0 110-11 5.5 5.5 0 010 11zM6 3.5a.5.5 0 010-1h2a.5.5 0 010 1H6zM18 4a1 1 0 110-2 1 1 0 010 2zm-3 0a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                      <span style="padding: 0 5px;">Washing machine</span>
                    </div>
                  </template>
                  <template v-if="house.isShampoo">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" d="M7.381 0c-1.457 0-2.7 1.065-2.7 1.065a.48.48 0 10.6.75S6.438.96 7.381.96c1.226 0 2.28.855 2.28.855l.12.09V3.84H9.211a.48.48 0 00-.39.48v2.4h-.48a4.336 4.336 0 00-4.32 4.32v2.73a.492.492 0 000 .285V21.6a2.41 2.41 0 002.4 2.4h11.52a2.41 2.41 0 002.4-2.4v-7.59a.488.488 0 000-.195V11.04a4.336 4.336 0 00-4.32-4.32h-.48v-2.4a.48.48 0 00-.48-.48h-.48V1.92h.48a.483.483 0 00.422-.238.485.485 0 000-.484.483.483 0 00-.422-.238h-.855a.45.45 0 00-.15-.015.422.422 0 00-.045.015h-3.645a.45.45 0 00-.15-.015.422.422 0 00-.045.015h-.06C9.894.786 8.87 0 7.381 0zm3.36 1.92h2.88v1.92h-2.88V1.92zm-.96 2.88h4.8v1.92h-4.8V4.8zm-1.44 2.88h7.68c1.85 0 3.36 1.51 3.36 3.36v2.4h-5.805c.026-.154.045-.319.045-.48a2.888 2.888 0 00-2.88-2.88 2.888 2.888 0 00-2.88 2.88c0 .161.019.326.045.48H4.981v-2.4c0-1.85 1.51-3.36 3.36-3.36zm2.4 3.36c1.067 0 1.92.853 1.92 1.92s-.853 1.92-1.92 1.92a1.91 1.91 0 01-1.74-1.11v-.015l-.015-.03-.015-.015c-.002-.004.002-.011 0-.015l-.015-.015a1.944 1.944 0 01-.135-.72c0-1.067.853-1.92 1.92-1.92zm-5.76 3.36h3.27a2.89 2.89 0 002.49 1.44 2.89 2.89 0 002.49-1.44h6.15v7.2a1.44 1.44 0 01-1.44 1.44H6.421a1.44 1.44 0 01-1.44-1.44v-7.2zm10.08 1.44c-1.056 0-1.92.864-1.92 1.92s.864 1.92 1.92 1.92 1.92-.864 1.92-1.92-.864-1.92-1.92-1.92zm0 .96c.536 0 .96.424.96.96s-.424.96-.96.96a.952.952 0 01-.96-.96c0-.536.424-.96.96-.96zm-3.84 2.4c-.79 0-1.44.65-1.44 1.44 0 .79.65 1.44 1.44 1.44.79 0 1.44-.65 1.44-1.44 0-.79-.65-1.44-1.44-1.44zm0 .96c.27 0 .48.21.48.48s-.21.48-.48.48-.48-.21-.48-.48.21-.48.48-.48z" fill="#000" fill-rule="nonzero"></path></svg>
                      <span style="padding: 0 5px;">Shampoo, Conditioner</span>
                    </div>
                  </template>
                  <template v-if="house.Toiletries">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" fill="#000" d="M0 7.429C0 3.367 1.964 0 4.571 0H19.43C22.036 0 24 3.367 24 7.429c0 4.06-1.964 7.428-4.571 7.428H16v8.572a.571.571 0 01-.571.571H.57a.571.571 0 01-.57-.571v-16zm14.857 7.428H4.571c-1.394 0-2.604-.963-3.428-2.48v10.48h13.714v-8zm4.572-1.143c1.81 0 3.428-2.772 3.428-6.285 0-3.514-1.617-6.286-3.428-6.286H7.035c1.286 1.323 2.108 3.66 2.108 6.286 0 2.626-.822 4.962-2.108 6.285H19.43zm-14.858 0C6.383 13.714 8 10.942 8 7.43c0-3.514-1.617-6.286-3.429-6.286-1.81 0-3.428 2.772-3.428 6.286 0 3.513 1.617 6.285 3.428 6.285zm0-4c-1.007 0-1.714-1.06-1.714-2.285 0-1.226.707-2.286 1.714-2.286 1.008 0 1.715 1.06 1.715 2.286 0 1.225-.707 2.285-1.715 2.285zm0-1.143c.256 0 .572-.474.572-1.142 0-.669-.316-1.143-.572-1.143-.255 0-.571.474-.571 1.143 0 .668.316 1.142.571 1.142z" fill-rule="evenodd"></path></svg>
                      <span style="padding: 0 5px;">Toiletries</span>
                    </div>
                  </template>
                </v-col>
              </template>
            </div>
            <p
              class="font-weight-bold"
              style="font-size: 1.25rem; margin-top: 20px"
            >Kitchen Facilities</p>
            <div class="d-flex justify-space-between">
              <template v-if="house.isHairDryer || house.isMicroWave || house.isMicroWave">
                <v-col cols="12" lg="4">
                  <template v-if="house.isHairDryer">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><g fill="none" fill-rule="evenodd"><path pid="0" d="M0 0h24v24H0z"></path><path pid="1" fill="#000" fill-rule="nonzero" d="M17.571 3.452L6.434 2.07a5.872 5.872 0 00-.669-.038C2.586 2.03 0 4.62 0 7.805v.12a5.78 5.78 0 002.932 5.028l1.54 6.226c.17.689.599 1.27 1.206 1.636a2.639 2.639 0 002.01.304l.042-.01a2.638 2.638 0 001.637-1.206 2.639 2.639 0 00.304-2.01l-1.112-4.495 9.012-1.12a.494.494 0 00.434-.49V3.943c0-.25-.186-.46-.434-.49zM8.711 18.13c.107.433.039.88-.191 1.262-.23.381-.595.65-1.027.757l-.043.01c-.432.107-.88.04-1.26-.19a1.656 1.656 0 01-.758-1.028l-1.36-5.495a5.737 5.737 0 002.367.215l1.131-.14 1.14 4.61zm8.305-6.78L6.32 12.68A4.786 4.786 0 01.99 7.925v-.12a4.786 4.786 0 015.328-4.754L17.016 4.38v6.97z"></path><path pid="2" fill="#000" fill-rule="nonzero" d="M2.763 7.865a3.293 3.293 0 003.29 3.29 3.293 3.293 0 003.288-3.29 3.293 3.293 0 00-3.289-3.289 3.293 3.293 0 00-3.289 3.29zm5.59 0c0 1.269-1.032 2.3-2.3 2.3a2.303 2.303 0 01-2.301-2.3c0-1.268 1.032-2.3 2.3-2.3 1.269 0 2.3 1.032 2.3 2.3z"></path><path pid="3" fill="#000" d="M19.196 6.305c.288 0 .426.155.688.476.289.356.684.843 1.455.843s1.166-.487 1.455-.843c.262-.321.4-.476.687-.476a.494.494 0 100-.99c-.77 0-1.166.487-1.455.843-.261.322-.4.477-.687.477-.288 0-.426-.155-.687-.477-.29-.356-.685-.842-1.455-.842a.494.494 0 000 .989zm4.285 1.998c-.77 0-1.166.486-1.455.842-.261.322-.4.477-.687.477-.288 0-.426-.155-.687-.477-.29-.356-.685-.842-1.455-.842a.494.494 0 100 .989c.287 0 .425.155.687.476.289.356.684.843 1.455.843s1.166-.487 1.455-.843c.262-.321.4-.476.688-.476a.494.494 0 100-.99z"></path></g></svg>
                      <span style="padding: 0 5px;">Hair Dryer</span>
                    </div>
                  </template>
                  <template v-if="house.isMicroWave">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" fill="#000" fill-rule="nonzero" d="M16 10V8.5a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V15h-.5a1.5 1.5 0 01-1.5-1.5v-2a1.5 1.5 0 011.5-1.5h.5zm0 1h-.5a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h.5v-3zM1.5 4h21A1.5 1.5 0 0124 5.5v14a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 19.5v-14A1.5 1.5 0 011.5 4zm0 1a.5.5 0 00-.5.5v14a.5.5 0 00.5.5h21a.5.5 0 00.5-.5v-14a.5.5 0 00-.5-.5h-21zm3 2h11A1.5 1.5 0 0117 8.5v8a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-8A1.5 1.5 0 014.5 7zm1.354 3.853a.5.5 0 01-.708-.707l1-1a.5.5 0 01.708.707l-1 1zm0 3a.5.5 0 01-.708-.707l4-4a.5.5 0 01.708.707l-4 4zM20 9a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                      <span style="padding: 0 5px;">Micro Wave</span>
                    </div>
                  </template>
                  <template v-if="house.isMicroWave">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" fill="#000" fill-rule="nonzero" d="M16 10V8.5a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V15h-.5a1.5 1.5 0 01-1.5-1.5v-2a1.5 1.5 0 011.5-1.5h.5zm0 1h-.5a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h.5v-3zM1.5 4h21A1.5 1.5 0 0124 5.5v14a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 19.5v-14A1.5 1.5 0 011.5 4zm0 1a.5.5 0 00-.5.5v14a.5.5 0 00.5.5h21a.5.5 0 00.5-.5v-14a.5.5 0 00-.5-.5h-21zm3 2h11A1.5 1.5 0 0117 8.5v8a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-8A1.5 1.5 0 014.5 7zm1.354 3.853a.5.5 0 01-.708-.707l1-1a.5.5 0 01.708.707l-1 1zm0 3a.5.5 0 01-.708-.707l4-4a.5.5 0 01.708.707l-4 4zM20 9a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                      <span style="padding: 0 5px;">Micro Wave</span>
                    </div>
                  </template>
                </v-col>
              </template>
              <template v-if="house.isFridge || house.isBalcony">
                <v-col cols="12" lg="4">
                  <template v-if="house.isFridge">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" fill="#000" fill-rule="nonzero" d="M17.5 0A1.5 1.5 0 0119 1.5v21a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 22.5v-21A1.5 1.5 0 016.5 0h11zM6 13h12V1.5a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5V13zm0 1v8.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V14H6zm1-6.5a.5.5 0 011 0v4a.5.5 0 11-1 0v-4zm0 8a.5.5 0 111 0v4a.5.5 0 11-1 0v-4zm8.854 6.354a.5.5 0 01-.708-.708l1-1a.5.5 0 01.708.708l-1 1zm-3 0a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708.708l-4 4z"></path></svg>
                      <span style="padding: 0 5px;">Fridge</span>
                    </div>
                  </template>
                  <template v-if="house.isBalcony">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><g fill-rule="evenodd"><path pid="0" fill-rule="nonzero" d="M23.485 13.987H18.2V6.87h.257a.468.468 0 000-.935h-.264A6.23 6.23 0 0011.977 0 6.23 6.23 0 005.76 5.936h-.264a.468.468 0 000 .935h.257v7.116H.468a.468.468 0 00-.468.468v9.03c0 .259.21.468.468.468h23.017c.259 0 .468-.21.468-.468v-9.03a.468.468 0 00-.468-.468zm-5.286.936h1.941v5.287H18.2v-5.287zM12.444.957a5.294 5.294 0 014.811 4.979h-1.608a3.708 3.708 0 00-3.203-3.203V.957zm0 2.721a2.772 2.772 0 012.258 2.258h-2.258V3.678zm0 5.543V6.87h3.269l-.89.89a.468.468 0 00.662.662l1.551-1.552h.227v7.116h-4.157l3.266-3.266a.468.468 0 00-.662-.661l-3.266 3.265V9.221zm4.82 5.702v5.287h-1.942v-5.287h1.941zm-4.82 0h1.942v5.287h-1.942v-5.287zM11.51.957v1.776a3.708 3.708 0 00-3.203 3.203H6.698a5.295 5.295 0 014.81-4.98zm0 2.721v2.258H9.25a2.772 2.772 0 012.258-2.258zm-4.82 8.427l1.551-1.552a.468.468 0 00-.661-.661l-.89.89v-3.91h4.819v2.155L9.25 11.285a.468.468 0 00.662.661l1.596-1.596v3.637H6.69v-1.882zm4.819 2.818v5.287H9.567v-5.287h1.942zm-4.819 0h1.942v5.287H6.69v-5.287zm-2.877 0h1.941v5.287H3.813v-5.287zm-2.877 0h1.941v5.287H.936v-5.287zm0 8.095v-1.872h22.082v1.872H.936zm22.082-2.808h-1.942v-5.287h1.942v5.287z"></path><path pid="1" d="M9.202 9.593a.468.468 0 00-.666-.658l-.008.008a.468.468 0 00.666.658l.008-.008zm4.671-.882l-.008.008a.468.468 0 00.661.662l.008-.008a.468.468 0 00-.661-.662z"></path></g></svg>
                      <span style="padding: 0 5px;">Balcony</span>
                    </div>
                  </template>
                  <template v-if="true">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" fill="#000" fill-rule="nonzero" d="M7 5.416c-1.048.18-2.054.416-3 .703V14h3V5.417zm1-.153V14h3.5V5.004c-1.197.02-2.37.107-3.5.26zm4.5-.259V14H16V5.263a29.966 29.966 0 00-3.5-.259zm4.5.412V14h3V6.12a24.728 24.728 0 00-3-.704zm4 1.034V14h2V7.304c-.622-.314-1.291-.6-2-.854zm2-.258V4.5a.5.5 0 011 0v16a.5.5 0 01-1 0V18H1v2.5a.5.5 0 11-1 0v-16a.5.5 0 111 0v1.692C3.99 4.792 7.875 4 12 4s8.011.792 11 2.192zM1 7.304V14h2V6.45c-.709.255-1.378.54-2 .854zM1 15v2h22v-2H1z"></path></svg>
                      <span style="padding: 0 5px;">Napkins</span>
                    </div>
                  </template>
                </v-col>
              </template>
              <template v-if="house.isWindows || house.isSmartTv || house.isExtraMattress">
                <v-col cols="12" lg="4">
                  <template v-if="true">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="Cửa sổ" style="width: 24px; height: 24px;"><g fill="#000" fill-rule="evenodd"><path pid="0" d="M22 21.01V4c.662-.002.998-.538 1-1.2V.4a.4.4 0 00-.4-.4H1.416a.4.4 0 00-.4.4v2.4c.002.662.322 1.198.984 1.2v17.01H.408a.4.4 0 00-.4.4v2.19c0 .22.18.4.4.4H23.6a.4.4 0 00.4-.4v-2.19a.4.4 0 00-.4-.4H22zM2 2.62V.996h20V2.62a.4.4 0 01-.4.4H2.4a.4.4 0 01-.4-.4zM21 4v17.01H3V4h18zm2 19H1v-1h22v1z" fill-rule="nonzero"></path><path pid="1" d="M19.612 5.032H4.449a.4.4 0 00-.4.4v14.184c0 .22.179.4.4.4h15.163a.4.4 0 00.4-.4V5.432a.4.4 0 00-.4-.4zm-8.136 13.967H5.003V13h6.473V19zm0-7H5.003V6.005h6.473v5.994zm7.524 7h-6.45V13H19V19zm0-7h-6.45V6.005H19v5.994z" fill-rule="nonzero"></path><path pid="2" d="M5.512 8l1.6-1.6.566.565-1.6 1.6zM5.679 10.315l3.6-3.599.565.566-3.6 3.6z"></path></g></svg>
                      <span style="padding: 0 5px;">Windows</span>
                    </div>
                  </template>
                  <template v-if="house.isShampoo">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><g fill-rule="evenodd"><path pid="0" fill-rule="nonzero" d="M22.5 2h-21C.673 2 0 2.673 0 3.5v14c0 .827.673 1.5 1.5 1.5H10v1.077l-5.582.93a.5.5 0 00.164.986L10.54 21h2.919l5.958.993a.497.497 0 00.575-.411.5.5 0 00-.411-.575L14 20.077V19h8.5c.827 0 1.5-.673 1.5-1.5v-14c0-.827-.673-1.5-1.5-1.5zM13 20h-2v-1h2v1zm10-2.5a.5.5 0 01-.5.5h-21a.5.5 0 01-.5-.5v-14a.5.5 0 01.5-.5h21a.5.5 0 01.5.5v14z"></path><path pid="1" d="M12.121 13.084a.967.967 0 00-.97.964c0 .532.435.964.97.964.535 0 .97-.432.97-.964a.967.967 0 00-.97-.964zm-3.25-2.781a.506.506 0 000 .707.486.486 0 00.695 0 3.406 3.406 0 014.868 0 .49.49 0 00.695 0 .506.506 0 000-.707 4.379 4.379 0 00-6.258 0z"></path><path pid="2" d="M7.419 8.89a.47.47 0 000 .68.51.51 0 00.704 0c2.138-2.065 5.615-2.065 7.754 0a.51.51 0 00.704 0 .47.47 0 000-.68c-2.526-2.44-6.636-2.44-9.162 0zm2.669 2.922a.436.436 0 000 .655c.197.18.518.18.716 0 .574-.524 1.576-.524 2.15 0 .099.09.229.135.358.135a.53.53 0 00.358-.135.436.436 0 000-.655c-.956-.874-2.627-.874-3.582 0z"></path></g></svg>
                      <span style="padding: 0 5px;">SmartTv</span>
                    </div>
                  </template>
                  <template v-if="house.Toiletries">
                    <div class="d-flex align-lg-center margin-bot-custom">
                      <svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" alt="" style="width: 24px; height: 24px;"><path pid="0" d="M20.772 10.386a2.46 2.46 0 00.662-1.655 2.446 2.446 0 00-2.44-2.441H5.916A5.916 5.916 0 000 12.207a5.916 5.916 0 005.917 5.917H20.07a3.885 3.885 0 003.89-3.89c.041-1.944-1.366-3.517-3.187-3.848zm-.662 6.91H5.917a5.086 5.086 0 01-5.09-5.09 5.086 5.086 0 015.09-5.089h13.076c.87 0 1.614.704 1.614 1.614 0 .869-.704 1.614-1.614 1.614H5.545c-1.035.083-1.904.993-1.904 2.069a2.05 2.05 0 002.07 2.069h12.123v-.828H5.752a1.22 1.22 0 01-1.242-1.241 1.22 1.22 0 011.242-1.242H20.11a3.055 3.055 0 013.062 3.062 3.055 3.055 0 01-3.062 3.063z"></path></svg>
                      <span style="padding: 0 5px;">ExtraMattress</span>
                    </div>
                  </template>
                </v-col>
              </template>
            </div>
          </v-responsive>
        </v-col>
        <v-col cols="12" lg="4" style="padding: 12px 0 12px 20px!important;">
          <v-card class="mx-auto" max-width="100%">
            <v-card-title>
              <span
                style="font-size: 28px!important; font-weight: 900!important;"
              >{{formatPrice(house.price)}}$</span>
              <span style="font-size: 14px!important; padding-top: 5px;">
                /
                <span v-if="isPrice">{{diffDays}}</span> night
              </span>
            </v-card-title>

            <v-container>
              <div class="d-flex justify-center">
                <v-menu
                  ref="fromMenu"
                  v-model="date.fromMenu"
                  :close-on-content-click="false"
                  :return-value.sync="date.fromDate"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date.fromDate" readonly v-on="on" />
                  </template>
                  <v-date-picker v-model="date.fromDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="fromMenu = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.fromMenu.save(date.fromDate)"
                      v-on:click="calculator"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="tousenu"
                  v-model="date.tousenu"
                  :close-on-content-click="false"
                  :return-value.sync="date.toDate"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date.toDate" readonly v-on="on" />
                  </template>
                  <v-date-picker v-model="date.toDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="tousenu = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.tousenu.save(date.toDate)"
                      v-on:click="calculator"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </div>
              <div>
                <v-combobox
                  style="background-color: white;"
                  v-model="guest.selectCBB"
                  :items="guest.itemCBBs"
                  outlined
                ></v-combobox>
              </div>
              <div class="d-flex justify-space-between" v-if="isPrice">
                <p class="font-weight-bold">Total</p>
                <p class="font-weight-bold">{{formatPrice(bookingPrice)}}$</p>
              </div>
              <v-card-actions>
                <v-btn
                  max-width="100%"
                  width="100%"
                  height="3rem"
                  style="box-shadow: 0 4px 12px 0 rgba(246,116,57,.4); background-image: linear-gradient(90deg,#f65e38 0,#f68a39 51%,#f65e38); color: white"
                  v-on:click="requestToBook()"
                  :disabled="isRequest"
                >Request to book</v-btn>
              </v-card-actions>
            </v-container>
            <v-divider></v-divider>
          </v-card>
        </v-col>
      </v-row>
      <v-responsive v-if="house.linkGoogleMap" class="map-area">
        <p class="font-weight-bold" style="font-size: 1.25rem;">Google map</p>
        <iframe
          :src="house.linkGoogleMap"
          width="100%"
          height="450"
          frameborder="0"
          style="border:0;"
          allowfullscreen
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </v-responsive>
      <v-divider style="margin: 20px 0;"></v-divider>
      <v-responsive class="comment-area">
        <v-row>
          <v-col cols="12" lg="10">
            <v-textarea
              v-model="comment.content"
              label="Comment"
              auto-grow
              outlined
              rows="1"
              row-height="15"
            ></v-textarea>
          </v-col>
          <v-col cols="12" lg="2">
            <v-btn class="primary" v-on:click="postComment()">Comment</v-btn>
          </v-col>
        </v-row>
        <div v-for="(userComment, index) in userComments" :key="index">
          <v-row>
            <v-col cols="12" lg="12">
              <v-avatar left>
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
              <v-chip class="ma-2">
                <span style="font-weight: bold">{{user.username}}</span>
                <span style="margin-left: 10px">{{userComment._source.content}}</span>
              </v-chip>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
      </v-responsive>
    </v-container>
  </v-app>
</template>

<script>
import SlideShowHouse from "@/components/SlideShowHouse";
export default {
  components: {
    SlideShowHouse,
  },
  data() {
    return {
      user: {
        userId: "",
        username: "",
        firstName: "",
        lastName: "",
        age: 0,
        address: "",
        email: "",
        phone: "",
        birthDay: "",
        description: "",
        avatar: "",
      },
      houseImages: [],
      items: [],
      house: {
        houseId: "",
        name: "",
        categoryId: "",
        houseTypeId: "",
        typeName: "",
        stateId: "",
        stateName: "",
        cityId: "",
        cityName: "",
        districtId: "",
        districtName: "",
        villageId: "",
        villageName: "",
        linkGoogleMap: "",
        price: "",
        bedroom: "",
        livingroom: "",
        bathroom: "",
        maxGuest: "",
        description: "",
        isWifi: false,
        isOven: false,
        isAirConditioning: false,
        isShampoo: false,
        isTowels: false,
        isToothpaste: false,
        isSoap: false,
        isHairDryer: false,
        isMicroWave: false,
        isFridge: false,
        isBalcony: false,
        isWindows: false,
        isSmartTv: false,
        isExtraMattress: false,
      },
      guest: {
        selectCBB: { count: 2, text: "2 guest" },
        itemCBBs: [
          { count: 1, text: "1 guest" },
          { count: 2, text: "2 guest" },
          { count: 3, text: "3 guest" },
          { count: 4, text: "4 guest" },
        ],
      },
      date: {
        fromDate: new Date().toISOString().substr(0, 10),
        toDate: new Date().toISOString().substr(0, 10),
        fromMenu: false,
        tousenu: false,
      },
      isPrice: false,
      bookingPrice: 0,
      diffDays: 1,
      comment: {
        classPK: 0,
        className: "",
        content: "",
      },
      userComments: [],
      isRequest: false,
      highLightVote: false,
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    calculator() {
      let vm = this;
      if (vm.date.fromDate && vm.date.toDate) {
        if (vm.date.fromDate < vm.date.toDate) {
          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          const fromDate = new Date(vm.date.fromDate);
          const toDate = new Date(vm.date.toDate);

          const diffDays = Math.round(Math.abs((fromDate - toDate) / oneDay));
          const price = Math.round(
            Math.abs((fromDate - toDate) / oneDay) * vm.house.price
          );
          vm.diffDays = diffDays;
          vm.bookingPrice = price;
          vm.isPrice = true;
        }
        let query = {
          indice: "Booking",
          size: 10000,
          query: {
            bool: {
              must: [
                {
                  match: {
                    _type: "Booking",
                  },
                },
                {
                  match: {
                    classPK: vm.$route.params.houseId,
                  },
                },
                {
                  match: {
                    className: "com.booking.model.House",
                  },
                },
                {
                  bool: {
                    should: [
                      {
                        match: {
                          bookingStatus: "renting",
                        },
                      },
                      {
                        match: {
                          bookingStatus: "cancel_pending",
                        },
                      },
                      {
                        match: {
                          bookingStatus: "cancel_failed",
                        },
                      },
                    ],
                  },
                },
                {
                  bool: {
                    should: [
                      {
                        range: {
                          fromDate: {
                            gte: vm.toTimestamp(vm.date.fromDate),
                            lte: vm.toTimestamp(vm.date.toDate),
                          },
                        },
                      },
                      {
                        range: {
                          toDate: {
                            gte: vm.toTimestamp(vm.date.fromDate),
                            lte: vm.toTimestamp(vm.date.toDate),
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        };
        vm.$axios
          .post(`/booking/api/v1/_search`, query)
          .then((response) => {
            if (response.data.hits.hits.length > 0) {
              vm.isRequest = true;
            } else {
              vm.isRequest = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    requestToBook() {
      let vm = this;
      let houseId = vm.$route.params.houseId;
      let booking = {
        classPK: houseId,
        numberOfGuest: vm.guest.selectCBB.count,
        fromDate: vm.date.fromDate,
        toDate: vm.date.toDate,
      };
      if (booking.toDate > booking.fromDate) {
        vm.$router.push({
          name: "PaymentView",
          params: {
            bookingInfo: booking,
          },
        });
      } else {
        alert("Chọn lại ngày!");
      }
    },
    postComment() {
      let vm = this;
      vm.comment.classPK = vm.$route.params.houseId;
      vm.comment.className = "com.booking.model.House";
      vm.$axios
        .post(`/booking/api/v1/comment`, vm.comment, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then((response) => {
          console.log(response);
          vm.$router.go();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    toTimestamp(strDate) {
      return Date.parse(strDate);
    },
    sharing() {},
    voting() {
      let vm = this;
      let voting = {
        className: "com.booking.model.House",
        classPK: vm.$route.params.houseId,
        star: 1,
      };
      let options = {
        method: "POST",
        url: `/booking/api/v1/voting`,
        data: voting,
        headers: { Authorization: localStorage.getItem("jwtToken") },
      };
      vm.$axios(options)
        .then((response) => {
          if (response.data) {
            vm.highLightVote = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created: function () {
    let vm = this;

    let userId = localStorage.getItem("userId");
    vm.$axios
      .get(`/booking/api/v1/user/` + userId, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        if (response.data) {
          vm.user = response.data;
        }
      })
      .catch((e) => {
        vm.errors.push(e);
      });
    vm.$axios
      .get(
        `/booking/api/v1/image/com.booking.model.House/` +
          vm.$route.params.houseId
      )
      .then((response) => {
        vm.houseImages = response.data.data;
      })
      .catch((e) => {
        console.log(e);
      });

    vm.$axios
      .get(`/booking/api/v1/house/` + vm.$route.params.houseId)
      .then((response) => {
        vm.house = response.data;
        let state = {
          text: vm.house.stateName,
          disabled: false,
          href: "",
        };
        let city = {
          text: vm.house.cityName,
          disabled: false,
          href: "",
        };
        let district = {
          text: vm.house.districtName,
          disabled: false,
          href: "",
        };
        let village = {
          text: vm.house.villageName,
          disabled: true,
          href: "",
        };
        vm.items.push(state);
        vm.items.push(city);
        vm.items.push(district);
        vm.items.push(village);
      })
      .catch((e) => {
        console.log(e);
      });

    var query = {
      indice: "Comment",
      query: {
        bool: {
          must: [
            {
              match: {
                _type: "Comment",
              },
            },
            {
              match: {
                classPK: vm.$route.params.houseId,
              },
            },
            {
              match: {
                className: "com.booking.model.House",
              },
            },
          ],
        },
      },
    };
    vm.$axios
      .post(`/booking/api/v1/_search`, query)
      .then((response) => {
        vm.userComments = response.data.hits.hits;
      })
      .catch((err) => {
        console.log(err);
      });

    var query2 = {
      indice: "Booking",
      size: 10000,
      query: {
        bool: {
          should: [
            {
              bool: {
                must: [
                  {
                    match: {
                      _type: "Booking",
                    },
                  },
                  {
                    match: {
                      classPK: vm.$route.params.houseId,
                    },
                  },
                  {
                    match: {
                      className: "com.booking.model.House",
                    },
                  },
                  {
                    bool: {
                      should: [
                        {
                          match: {
                            bookingStatus: "renting",
                          },
                        },
                        {
                          match: {
                            bookingStatus: "cancel_pending",
                          },
                        },
                        {
                          match: {
                            bookingStatus: "cancel_failed",
                          },
                        },
                      ],
                    },
                  },
                  {
                    bool: {
                      should: [
                        {
                          range: {
                            fromDate: {
                              gte: vm.toTimestamp(vm.date.fromDate),
                              lte: vm.toTimestamp(vm.date.toDate),
                            },
                          },
                        },
                        {
                          range: {
                            toDate: {
                              gte: vm.toTimestamp(vm.date.fromDate),
                              lte: vm.toTimestamp(vm.date.toDate),
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              bool: {
                must: [
                  {
                    match: {
                      _type: "House",
                    },
                  },
                  {
                    match: {
                      houseId: vm.$route.params.houseId,
                    },
                  },
                  {
                    bool: {
                      should: [
                        {
                          match: {
                            isActive: 0,
                          },
                        },
                        {
                          match: {
                            isActive: 2,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    };
    vm.$axios
      .post(`/booking/api/v1/_search`, query2)
      .then((response) => {
        if (response.data.hits.hits.length > 0) {
          vm.isRequest = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    let queryVote = {
      indice: "Voting",
      size: 10000,
      query: {
        bool: {
          must: [
            {
              match: {
                _type: "Voting",
              },
            },
            {
              match: {
                className: "com.booking.model.House",
              },
            },
            {
              match: {
                classPK: vm.$route.params.houseId,
              },
            },
            {
              match: {
                userId: localStorage.getItem("userId"),
              },
            },
          ],
        },
      },
    };
    vm.$axios
      .post(`/booking/api/v1/_search`, queryVote)
      .then((response) => {
        if (response.data.hits.hits.length > 0) {
          vm.highLightVote = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
#common-house .v-breadcrumbs {
  padding-left: 12px !important;
}
.disable-events {
  pointer-events: none;
}

.margin-bot-custom {
  margin-bottom: 15px;
}
</style>