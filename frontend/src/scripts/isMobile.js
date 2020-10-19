const isMobile = () => {
    if(window.screen.width >= 1130) {
        return false
    }
    else {
        return true
    }
}

export default isMobile