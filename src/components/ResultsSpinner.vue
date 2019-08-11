<template>
    <main class="spinner-container">
        <div class="lds-css ng-scope">
            <div style="width:100%;height:100%" class="lds-ripple">
                <div></div><div></div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
.spinner-container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes lds-ripple {
  0% {
    top: 94px;
    left: 94px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 47px;
    left: 47px;
    width: 94px;
    height: 94px;
    opacity: 0;
  }
}
@-webkit-keyframes lds-ripple {
  0% {
    top: 94px;
    left: 94px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 47px;
    left: 47px;
    width: 94px;
    height: 94px;
    opacity: 0;
  }
}
.lds-ripple {
  position: relative;
}
.lds-ripple div {
  box-sizing: content-box;
  position: absolute;
  border-width: 6px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  -webkit-animation: lds-ripple 1.3s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  animation: lds-ripple 1.3s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(1) {
  border-color: $accent;
}
.lds-ripple div:nth-child(2) {
  border-color: $accent-dark;
  -webkit-animation-delay: -0.65s;
  animation-delay: -0.65s;
}
.lds-ripple {
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}
</style>