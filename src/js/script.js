// Import Three.js library for the WebGL background
import * as THREE from "https://cdn.skypack.dev/three@0.124.0";

const waveClothVertexShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;
varying vec3 vPosition;
float noise(vec3 x){
    vec3 p=floor(x);
    vec3 f=fract(x);
    f=f*f*(3.-2.*f);
    float n=p.x+p.y*157.+113.*p.z;
    return mix(mix(mix( fract(sin(n+0.)*43758.5453), fract(sin(n+1.)*43758.5453),f.x),
                   mix( fract(sin(n+157.)*43758.5453), fract(sin(n+158.)*43758.5453),f.x),f.y),
               mix(mix( fract(sin(n+113.)*43758.5453), fract(sin(n+114.)*43758.5453),f.x),
                   mix( fract(sin(n+270.)*43758.5453), fract(sin(n+271.)*43758.5453),f.x),f.y),f.z);
}
float xmbNoise(vec3 x){
    return cos(x.z*4.)*cos(x.z+uTime/10.+x.x);
}
void main(){
    vec2 st = position.xy;
    float aspect = uResolution.x / uResolution.y;
    st.x *= aspect;
    vec3 p = vec3(st.x, 0.0, st.y);
    p.y = xmbNoise(p)/8.;
    vec3 p2 = p;
    p2.x -= uTime/5.;
    p2.x /= 4.;
    p2.y -= uTime/100.;
    p2.z -= uTime/10.;
    p.y -= noise(p2*8.)/12.+cos(p.x*2.-uTime/2.)/5.-.3;
    p.z -= noise(p2*8.)/12.;
    vec4 modelPosition = modelMatrix * vec4(p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vUv = uv;
    vPosition = p;
}`;

const waveClothFragmentShader = `
vec3 computeNormal(vec3 normal){
    vec3 X=dFdx(normal);
    vec3 Y=dFdy(normal);
    vec3 cNormal=normalize(cross(X,Y));
    return cNormal;
}
float fresnel(float bias,float scale,float power,vec3 I,vec3 N){
    return bias+scale*pow(1.+dot(I,N),power);
}
varying vec2 vUv;
varying vec3 vPosition;
void main(){
    vec3 color=vec3(1.);
    vec3 cNormal=computeNormal(vPosition);
    vec3 eyeVector=vec3(0.,0.,-1.);
    float F=fresnel(0.,.5,4.,eyeVector,cNormal);
    float alpha=F*.5;
    gl_FragColor=vec4(color,alpha);
}`;

// Manages the Three.js WebGL canvas for the animated background.
class WaveCanvas {
    constructor(sel) {
        this.container = document.querySelector(sel);
        this.camera = null;
        this.renderer = null;
        this.scene = null;
        this.clock = new THREE.Clock();
        this.waveMaterial = null;
    }

    init() {
        this.scene = new THREE.Scene();
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.OrthographicCamera(-1 * aspect, 1 * aspect, 1, -1, -100, 1000);
        this.camera.position.set(0, 0, 2);
        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        this.createWave();
        this.addEventListeners();
        this.animate();
    }

    createWave() {
        this.waveMaterial = new THREE.ShaderMaterial({
            vertexShader: waveClothVertexShader,
            fragmentShader: waveClothFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector2(this.container.clientWidth, this.container.clientHeight) }
            },
            transparent: true,
            depthTest: false,
        });
        const geometry = new THREE.PlaneGeometry(2, 2, 128, 128);
        const plane = new THREE.Mesh(geometry, this.waveMaterial);
        this.scene.add(plane);
    }
    
    animate = () => {
        const elapsedTime = this.clock.getElapsedTime();
        if (this.waveMaterial) {
            this.waveMaterial.uniforms.uTime.value = elapsedTime;
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            
            this.renderer.setSize(width, height);
            
            if (this.waveMaterial) {
                this.waveMaterial.uniforms.uResolution.value.set(width, height);
            }
            
            // Update the camera's aspect ratio to prevent distortion on resize.
            const newAspect = width / height;
            this.camera.left = -1 * newAspect;
            this.camera.right = 1 * newAspect;
            this.camera.updateProjectionMatrix();
        });
    }
}

class XMBNavigation {
    constructor() {
        this.horizontalMenu = document.getElementById('horizontal-menu');
        this.horizontalItems = Array.from(this.horizontalMenu.querySelectorAll('.xmb-item')); // These are the <li> elements
    this.verticalMenus = Array.from(document.querySelectorAll('.vertical-menu'));
        this.contentDisplay = document.getElementById('content-display');
        this.contentTitle = document.getElementById('content-title');
        this.contentBody = document.getElementById('content-body');

        this.currentX = 0;
        this.currentY = 0;
    }

    init() {
        this.addEventListeners();
        // Wait for translations to be applied before showing initial content
        document.addEventListener('translationsApplied', () => {
            const activeItem = document.querySelector('.vertical-menu button[aria-pressed="true"]');
            if (activeItem) {
                this.updateContent(activeItem);
            } else {
                this.updateSelection();
            }
        });
    }

    updateSelection() {
        // Horizontal menu active state
        this.horizontalItems.forEach((item, index) => {
            const isActive = index === this.currentX;
            item.classList.toggle('active', isActive);
            item.querySelector('button').setAttribute('aria-selected', isActive);
        });

        // Vertical menu active state
        this.verticalMenus.forEach((menu, index) => {
            const menuIsActive = index === this.currentX;
            menu.classList.toggle('active', menuIsActive);
            // Hide non-active tabpanels for accessibility
            menu.hidden = !menuIsActive;

            if (menuIsActive) {
                const menuButtons = Array.from(menu.querySelectorAll('li > button'));
                menuButtons.forEach((button, itemIndex) => {
                    const isActive = itemIndex === this.currentY;
                    button.setAttribute('aria-pressed', isActive);
                });
                const activeVerticalItem = menu.querySelector('button[aria-pressed="true"]');
                if (activeVerticalItem) {
                    this.updateContent(activeVerticalItem);
                }
            } else {
                // Ensure all buttons in inactive menus are not marked as pressed.
                menu.querySelectorAll('li > button').forEach(button => {
                    button.setAttribute('aria-pressed', 'false');
                });
            }
        });
    }
    positionVerticalMenu(menu) {
        // Ditching translate/positioning. CSS will handle layout.
        menu.style.left = '';
        menu.style.top = '';
    }

    updateContent(selectedItem) {
        // Always animate by removing and re-adding the 'visible' class
        this.contentDisplay.classList.remove('visible');

        // A short delay to allow the fade-out transition to start
        setTimeout(() => {
            if (selectedItem.dataset.hideContent) {
                return;
            }

            if (selectedItem.dataset.link) {
                this.contentTitle.textContent = selectedItem.dataset.title || 'Link';
                this.contentBody.innerHTML = selectedItem.dataset.content;
            } else {
                this.contentTitle.textContent = selectedItem.dataset.title;
                this.contentBody.innerHTML = selectedItem.dataset.content;
            }
            this.contentDisplay.classList.add('visible');
            
            // Move focus to the new content title for screen reader users
            this.contentTitle.focus();
        }, 150);
    }

    executeAction(selectedItem) {
        if (selectedItem.dataset.link) {
            window.open(selectedItem.dataset.link, '_blank');
        }
    }

    addEventListeners() {
        document.addEventListener('keydown', (e) => {
            const navKeys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Enter'];
            if (!navKeys.includes(e.key)) return;
            e.preventDefault();

            const activeVerticalMenu = document.querySelector(`.vertical-menu[data-column='${this.currentX}']`);
            if (!activeVerticalMenu) return;
            const verticalItemsCount = activeVerticalMenu.querySelectorAll('li > button').length;
            if (verticalItemsCount === 0) return;

            switch (e.key) {
                case 'ArrowRight':
                    this.currentX = (this.currentX + 1) % this.horizontalItems.length;
                    this.currentY = 0;
                    break;
                case 'ArrowLeft':
                    this.currentX = (this.currentX - 1 + this.horizontalItems.length) % this.horizontalItems.length;
                    this.currentY = 0;
                    break;
                case 'ArrowDown':
                    this.currentY = (this.currentY + 1) % verticalItemsCount;
                    break;
                case 'ArrowUp':
                    this.currentY = (this.currentY - 1 + verticalItemsCount) % verticalItemsCount;
                    break;
                case 'Enter':
                    // Select the item based on aria-pressed state
                    const selectedItem = activeVerticalMenu.querySelector('button[aria-pressed="true"]');
                    if (selectedItem) this.executeAction(selectedItem);
                    break;
            }
            this.updateSelection();
        });

        this.horizontalItems.forEach((item, index) => {
            item.querySelector('button').addEventListener('click', () => {
                if (this.currentX === index) return;
                this.currentX = index;
                this.currentY = 0;
                this.updateSelection();
            });
        });

        this.verticalMenus.forEach(menu => {
            menu.querySelectorAll('li > button').forEach((button, index) => {
                button.addEventListener('click', () => {
                    const parentColumn = parseInt(menu.dataset.column, 10);
                    // Check wasAlreadyActive based on aria-pressed state
                    const wasAlreadyActive = button.getAttribute('aria-pressed') === 'true';
                    this.currentX = parentColumn;
                    this.currentY = index;
                    this.updateSelection();
                    if (wasAlreadyActive) {
                        this.executeAction(button);
                    }
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // A global flag to disable animations for testing, set via an init script in Playwright.
    if (!window.E2E_ANIMATIONS_DISABLED) {
        const waveCanvas = new WaveCanvas('#dynamic-background');
        waveCanvas.init();
    }
    const navigation = new XMBNavigation();
    navigation.init();

    // Dark mode toggle logic
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    function setDarkMode(enabled) {
        document.body.classList.toggle('dark-mode', enabled);
        darkModeToggle.setAttribute('aria-pressed', enabled);
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('i');
            if (enabled) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
        localStorage.setItem('portfolio-dark-mode', enabled ? '1' : '0');
    }
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            setDarkMode(!document.body.classList.contains('dark-mode'));
        });
        // Load preference or use system/browser preference if not set
        let saved = localStorage.getItem('portfolio-dark-mode');
        if (saved === null) {
            saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? '1' : '0';
        }
        const isDarkMode = saved === '1';
        setDarkMode(isDarkMode);
    }
});