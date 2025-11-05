document.addEventListener('DOMContentLoaded', function() {
    //This section injects the script and stuff into the html
	//Big Jon made lil javascript, node js on top of it, then you get the css and you use the pretty print-> inside developer ryhme, yall get it right?
    const wrapper = document.createElement('div');
    wrapper.className = 'console-wrapper';

    wrapper.innerHTML = `
        <div class="console-box-3d" id="consoleBox">
            <!-- Face 1: Front (content) -->
            <div class="console-face"><div class="console-content"></div></div>
            
            <!-- Face 2: Back (content) -->
            <div class="console-face"><div class="console-content"></div></div>
            
            <!-- Face 3: Right side (solid - no content) -->
            <div class="console-face"></div>
            
            <!-- Face 4: Left side (solid - no content) -->
            <div class="console-face"></div>
            
            <!-- Face 5: Top (content) -->
            <div class="console-face"><div class="console-content"></div></div>
            
            <!-- Face 6: Bottom (content) -->
            <div class="console-face"><div class="console-content"></div></div>
        </div>
    `;
	//use prepend instead of append if you want it loading at the begging of your html instead of the end, personal choice homie!
    document.body.appendChild(wrapper);

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .console-wrapper {
            perspective: 1200px;
            width: 100%;
            max-width: 900px;
            margin: 0 auto 3rem;
            --box-height: 240px;
            --translate-z: 120px;
            --side-width: 240px;
            --input-font-size: 0.75rem;
            --output-font-size: 1.3rem;
            --label-font-size: 0.7rem;
            --content-padding: 0.5rem;
        }
        .console-box-3d {
            position: relative;
            width: 100%;
            height: var(--box-height);
            transform-style: preserve-3d;
            transition: transform 1s ease-in-out, height 0.3s ease;
        }
        .console-box-background {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(15, 15, 15, 1);
            border-radius: 0.75rem;
            z-index: -1;
            top: 0;
            left: 0;
        }
        .console-face {
            position: absolute;
            width: 100%;
            height: var(--box-height);
            background: rgba(20, 20, 20, 1);
            border: 2px solid rgba(0, 191, 255, 0.5);
            border-radius: 0.75rem;
            padding: 2px;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            overflow: hidden;
            box-sizing: border-box;
            color: #ffffff;
        }
        .console-wrapper:hover .console-face,
        .console-face.mobile-glow {
            border-color: rgba(0, 191, 255, 0.9);
            box-shadow: 0 0 30px rgba(0, 191, 255, 0.4), inset 0 0 20px rgba(0, 191, 255, 0.1);
        }
        .console-face:nth-child(1) {
            transform: rotateY(0deg) translateZ(var(--translate-z));
        }
        .console-face:nth-child(2) {
            transform: rotateY(180deg) translateZ(var(--translate-z));
        }
        .console-face:nth-child(3) {
            transform: rotateY(90deg) translateZ(calc(50% - var(--translate-z)));
            width: var(--box-height);
            height: var(--box-height);
            left: auto;
            right: 0;
        }
        .console-face:nth-child(4) {
            transform: rotateY(-90deg) translateZ(calc(50% - var(--translate-z)));
            width: var(--box-height);
            height: var(--box-height);
            left: 0;
            right: auto;
        }
        .console-face:nth-child(5) {
            transform: rotateX(90deg) translateZ(var(--translate-z));
        }
        .console-face:nth-child(6) {
            transform: rotateX(-90deg) translateZ(var(--translate-z));
        }
        .console-box-3d.rotate-0 { transform: rotateX(0deg); }
        .console-box-3d.rotate-1 { transform: rotateX(-90deg); }
        .console-box-3d.rotate-2 { transform: rotateX(-180deg); }
        .console-box-3d.rotate-3 { transform: rotateX(-270deg); }
        .console-box-3d.rotate-reset { transform: rotateX(-360deg); }
        .console-content {
            position: relative;
            font-family: 'Courier New', monospace;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: var(--content-padding);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            z-index: 20;
            transform-style: preserve-3d;
            box-sizing: border-box;
        }
        .console-face:nth-child(2) .console-content {
            transform: rotateY(180deg) rotateX(180deg);
        }
        .console-line {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            margin-bottom: 0.3rem;
            flex-wrap: wrap;
            text-align: left;
        }
        .console-line.output-line {
            font-size: var(--label-font-size);
            margin-bottom: 0.25rem;
            margin-top: 0.25rem;
        }
        .console-label {
            color: rgba(0, 191, 255, 0.9);
            font-size: var(--label-font-size);
            font-weight: bold;
            margin-right: 0.5rem;
            white-space: nowrap;
            letter-spacing: 0.05em;
            position: relative;
            z-index: 30;
            transform: translateZ(0);
        }
        .console-input {
            color: #00ff00;
            font-size: var(--input-font-size);
            flex: 1;
            min-width: 0;
            text-align: left;
            word-wrap: break-word;
            overflow-wrap: break-word;
            position: relative;
            z-index: 20;
            transform: translateZ(0);
        }
        .console-input .input-char {
            opacity: 0;
        }
        .console-input .input-char.visible {
            opacity: 1;
        }
        .console-output {
            opacity: 0;
            font-size: var(--output-font-size);
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding: 0;
            margin-top: 0;
            font-weight: 500;
            word-wrap: break-word;
            overflow-wrap: break-word;
            line-height: 1.4;
            white-space: normal;
            position: relative;
            z-index: 20;
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }
        .console-output.typing {
            opacity: 1;
        }
        .console-output .char {
            opacity: 0;
        }
        .console-output .char.visible {
            opacity: 1;
        }
        .console-output-line {
            margin-bottom: 0.15rem;
        }
        .typing-cursor {
            position: absolute;
            display: none;
            font-size: 1.2rem;
            color: rgba(0, 191, 255, 0.9);
            font-family: 'Courier New', monospace;
            animation: blink 1s infinite;
            pointer-events: none;
            z-index: 200;
        }
        @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
        }
        .c-white { color: #ffffff; }
        .c-cyan { color: #00bfff; }
        .c-red { color: #ff4444; }
        .c-blue { color: #4a9eff; }
        .c-yellow { color: #ffd700; }
        .c-green { color: #00ff00; }
        .c-orange { color: #ff8c00; }
        .c-purple { color: #da70d6; }
        .c-pink { color: #ff69b4; }
        @media (max-width: 768px) {
            .console-wrapper {
                max-width: 90vw;
                perspective: 800px;
            }
            .console-face.mobile-glow {
                border-color: rgba(0, 191, 255, 0.9);
                box-shadow: 0 0 30px rgba(0, 191, 255, 0.4);
            }
        }
        @media (max-width: 480px) {
            .console-wrapper {
                max-width: 95vw;
                perspective: 500px;
                margin-bottom: 1.5rem;
            }
        }
		.console-box-3d.rotating .console-face {
			border-color: transparent !important;
			box-shadow: none !important;
		}
    `;
    document.head.appendChild(styleSheet);

    const consoleBox = document.getElementById('consoleBox');
    const consoleFaces = document.querySelectorAll('.console-face');
    let currentFace = 0;
    let isAnimating = false;
    
    const contentFaceIndices = [0, 4, 1, 5];
    
    const FASTEST_READER = 450;
    const SLOWEST_READER = 200;
    const AVG_WORD_LENGTH = 5;
    const CHARS_PER_MINUTE = FASTEST_READER * AVG_WORD_LENGTH;
    const OUTPUT_TYPING_SPEED = Math.floor(60000 / CHARS_PER_MINUTE);
    const INPUT_TYPING_SPEED = 2;
    const INPUT_WAIT_TIME = 150;

    const messages = [
        {
            input: 'console.log("We build Digital Experiences"); console.warn("not just \'Websites\'");',
            output: [
                { text: 'We build ', color: 'white' },
                { text: 'Digital Experiences  ', color: 'cyan' },
                { text: ' not just ', color: 'white' },
                { text: '"Websites"', color: 'red' }
            ]
        },
        {
            input: 'const team = { developers: 7, skillLevel: "highly-skilled", leader: "Jon" };',
            output: [
                { text: 'A ', color: 'white' },
                { text: 'team', color: 'blue' },
                { text: ' of ', color: 'white' },
                { text: '7 ', color: 'red' },
                { text: 'developers ', color: 'white' },
                { text: 'led ', color: 'yellow' },
                { text: 'by ', color: 'yellow' },
                { text: 'Jon', color: 'yellow' }
				
            ]
        },
        {
            input: 'if (leader === "Jon") { BUILD(); FORGE(); CREATE(); transformVisitorsToCustomers(); }',
            output: [
                { text: 'We ', color: 'white' },
                { text: 'BUILD', color: 'orange' },
                { text: ', ', color: 'white' },
                { text: 'FORGE', color: 'purple' },
                { text: ' & ', color: 'white' },
                { text: 'CREATE', color: 'pink' },
                { text: ' to ', color: 'white' },
                { text: 'TRANSFORM', color: 'green' },
                { text: ' visitors ', color: 'white' },
                { text: 'into ', color: 'white' },
                { text: 'CUSTOMERS', color: 'cyan' }
            ]
        },
        {
            input: 'const dataPolicy = { owner: "YOU", storage: "YOUR_SERVERS", leaks: 0, lawsuits: 0 };',
            output: [
                { text: 'Your ', color: 'white' },
                { text: 'DATA', color: 'cyan' },
                { text: ' stays in ', color: 'white' },
                { text: 'YOUR', color: 'green' },
                { text: ' hands, ', color: 'white' },
                { text: 'NOT', color: 'red' },
                { text: ' someone else\'s!', color: 'white' }
            ]
        }
    ];

    // Create a temporary canvas for text measurement
    const measureCanvas = document.createElement('canvas');
    const measureContext = measureCanvas.getContext('2d');

    // Helper function to measure character width with proper font
    function getCharWidth(char, fontSizeRem) {
        const fontSizePx = fontSizeRem * 16;
        measureContext.font = `500 ${fontSizePx}px "Courier New", monospace`;
        return measureContext.measureText(char).width;
    }

    function getResponsiveConfig() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const wrapper = document.querySelector('.console-wrapper');
        
        // Calculate wrapper width with 10px padding on each side
        const maxWrapperWidth = width - 20;
        const actualWrapperWidth = wrapper ? Math.min(wrapper.offsetWidth, maxWrapperWidth) : maxWrapperWidth;
        
        // FIXED translateZ - adjusted to eliminate overlap
		//NOTE: This is a ghetto half butt fix,  it needs to be made "dynamic and based off thes screen size"
		//But I cant mathematically figure that out right now because my adderall is wearing off lmao
		//So I'll leave this here for now and let the github community turn this into a box instead of a big rotating H
        let translateZ;
        if (width <= 480) {
            translateZ = 60; // Small screens
        } else if (width <= 768) {
            translateZ = 68; // Medium screens  
        } else if (width <= 1024) {
            translateZ = 75; // Large tablets
        } else {
            translateZ = 85; // Desktop - adjusted from 70
        }
        
        if (width <= 480) {
            const boxHeight = Math.min(180, height * 0.25);
            return {
                boxHeight: boxHeight,
                translateZ: translateZ,
                sideWidth: boxHeight,
                inputFontSize: 0.6,
                outputFontSize: .8,
                labelFontSize: 0.5,
                padding: 0.4,
                actualWrapperWidth: actualWrapperWidth
            };
        } else if (width <= 768) {
            const boxHeight = Math.min(200, height * 0.25);
            return {
                boxHeight: boxHeight,
                translateZ: translateZ,
                sideWidth: boxHeight,
                inputFontSize: .8,
                outputFontSize: 1,
                labelFontSize: 0.58,
                padding: 0.5,
                actualWrapperWidth: actualWrapperWidth
            };
        } else if (width <= 1024) {
            return {
                boxHeight: 220,
                translateZ: translateZ,
                sideWidth: 220,
                inputFontSize: 1.2,
                outputFontSize: 1.4,
                labelFontSize: 0.65,
                padding: 0.5,
                actualWrapperWidth: actualWrapperWidth
            };
        } else {
            return {
                boxHeight: 240,
                translateZ: translateZ,
                sideWidth: 240,
                inputFontSize: 1.4,
                outputFontSize: 1.6,
                labelFontSize: 0.7,
                padding: 0.5,
                actualWrapperWidth: actualWrapperWidth
            };
        }
    }

    function applyResponsiveStyles() {
        const config = getResponsiveConfig();
        const wrapper = document.querySelector('.console-wrapper');
        
        if (wrapper) {
            // Apply width constraint with 10px padding
            wrapper.style.maxWidth = `${config.actualWrapperWidth}px`;
            
            wrapper.style.setProperty('--box-height', `${config.boxHeight}px`);
            wrapper.style.setProperty('--translate-z', `${config.translateZ}px`);
            wrapper.style.setProperty('--side-width', `${config.sideWidth}px`);
            wrapper.style.setProperty('--input-font-size', `${config.inputFontSize}rem`);
            wrapper.style.setProperty('--output-font-size', `${config.outputFontSize}rem`);
            wrapper.style.setProperty('--label-font-size', `${config.labelFontSize}rem`);
            wrapper.style.setProperty('--content-padding', `${config.padding}rem`);
        }
        
        if (consoleBox) {
            consoleBox.style.height = `${config.boxHeight}px`;
        }
        
        consoleFaces.forEach((face, index) => {
            face.style.height = `${config.boxHeight}px`;
            
            if (index === 0) {
                face.style.transform = `rotateY(0deg) translateZ(${config.translateZ}px)`;
                face.style.width = '100%';
            } else if (index === 1) {
                face.style.transform = `rotateY(180deg) translateZ(${config.translateZ}px)`;
                face.style.width = '100%';
            } else if (index === 2) {
                const boxWidth = wrapper.offsetWidth;
                const translateZSide = (boxWidth / 2) - config.translateZ;
                face.style.transform = `rotateY(90deg) translateZ(${translateZSide}px)`;
                face.style.width = `${config.boxHeight}px`;
                face.style.height = `${config.boxHeight}px`;
                face.style.left = 'auto';
                face.style.right = '0';
            } else if (index === 3) {
                const boxWidth = wrapper.offsetWidth;
                const translateZSide = (boxWidth / 2) - config.translateZ;
                face.style.transform = `rotateY(-90deg) translateZ(${translateZSide}px)`;
                face.style.width = `${config.boxHeight}px`;
                face.style.height = `${config.boxHeight}px`;
                face.style.left = '0';
                face.style.right = 'auto';
            } else if (index === 4) {
                face.style.transform = `rotateX(90deg) translateZ(${config.translateZ}px)`;
                face.style.width = '100%';
            } else if (index === 5) {
                face.style.transform = `rotateX(-90deg) translateZ(${config.translateZ}px)`;
                face.style.width = '100%';
            }
        });
    }

    function splitIntoLines(segments) {
        const config = getResponsiveConfig();
        const availableWidth = config.actualWrapperWidth - (config.padding * 16 * 2) - 20;
        
        const lines = [];
        let currentLine = [];
        let currentLineWidth = 0;
        
        segments.forEach((segment) => {
            // Split by spaces but keep track of each character
            const text = segment.text;
            let currentWord = '';
            let currentWordWidth = 0;
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const charWidth = getCharWidth(char, config.outputFontSize);
                
                if (char === ' ') {
                    // End of word - check if we need to wrap
                    if (currentWord) {
                        const spaceWidth = getCharWidth(' ', config.outputFontSize);
                        const totalWidth = currentLineWidth + currentWordWidth + (currentLine.length > 0 ? spaceWidth : 0);
                        
                        if (totalWidth > availableWidth && currentLine.length > 0) {
                            // Start new line
                            lines.push([...currentLine]);
                            currentLine = [{ text: currentWord, color: segment.color }];
                            currentLineWidth = currentWordWidth;
                        } else {
                            // Add to current line
                            if (currentLine.length > 0) {
                                currentLine.push({ text: ' ', color: segment.color });
                                currentLineWidth += spaceWidth;
                            }
                            currentLine.push({ text: currentWord, color: segment.color });
                            currentLineWidth += currentWordWidth;
                        }
                        currentWord = '';
                        currentWordWidth = 0;
                    }
                } else {
                    currentWord += char;
                    currentWordWidth += charWidth;
                }
            }
            
            // Handle remaining word
            if (currentWord) {
                const spaceWidth = getCharWidth(' ', config.outputFontSize);
                const totalWidth = currentLineWidth + currentWordWidth + (currentLine.length > 0 ? spaceWidth : 0);
                
                if (totalWidth > availableWidth && currentLine.length > 0) {
                    lines.push([...currentLine]);
                    currentLine = [{ text: currentWord, color: segment.color }];
                    currentLineWidth = currentWordWidth;
                } else {
                    if (currentLine.length > 0) {
                        currentLine.push({ text: ' ', color: segment.color });
                        currentLineWidth += spaceWidth;
                    }
                    currentLine.push({ text: currentWord, color: segment.color });
                    currentLineWidth += currentWordWidth;
                }
            }
        });
        
        if (currentLine.length > 0) {
            lines.push(currentLine);
        }
        
        return lines;
    }

	function calculateBoxHeight(lines) {
		const config = getResponsiveConfig();
		const lineHeight = config.outputFontSize * 16 * 1.4;
		const labelHeight = config.labelFontSize * 16 * 2.5;
		const padding = config.padding * 16 * 2;
		const inputHeight = config.inputFontSize * 16 * 3;

		let totalHeight = padding + labelHeight + inputHeight + (lines.length * lineHeight) + 20;

		// Ensure minimum height and reasonable maximum
		const minHeight = config.boxHeight * 0.8;
		const maxHeight = window.innerHeight * 0.4;

		// Dynamic shrink: smaller screens = smaller adjustment
		const w = window.innerWidth;
		const heightAdjustment = w < 400 ? 10 : 15;

		// Clamp total height first, *then* safely subtract
		totalHeight = Math.max(minHeight, Math.min(totalHeight, maxHeight));

		// Prevent negative height by ensuring we don’t go below minHeight
		const adjustedHeight = Math.max(minHeight, totalHeight - heightAdjustment);

		return adjustedHeight;
	}


    function calculateReadWaitTime(textLength) {
        const words = Math.ceil(textLength / AVG_WORD_LENGTH);
        const slowestReadTime = (words / SLOWEST_READER) * 60000;
        return Math.max(slowestReadTime, 3500);
    }

    function showInputThenOutput(face, messageData, callback) {
        const content = face.querySelector('.console-content');
        if (!content) {
            console.error('ERROR: No content div found!');
            return callback();
        }

        console.log(`=== Animation START for currentFace=${currentFace} ===`);

        const lines = splitIntoLines(messageData.output);
        const newHeight = calculateBoxHeight(lines);
        
        const wrapper = document.querySelector('.console-wrapper');
        wrapper.style.setProperty('--box-height', `${newHeight}px`);
        consoleBox.style.height = `${newHeight}px`;
        consoleFaces.forEach(f => f.style.height = `${newHeight}px`);

        content.innerHTML = `
            <div class="console-line">
                <span class="console-label">SYSTEM INPUT:</span>
                <span class="console-input"></span>
            </div>
            <div class="console-line output-line" style="display:none;">
                <span class="console-label">SYSTEM OUTPUT:</span>
            </div>
            <div class="console-output"></div>
            <span class="typing-cursor">_</span>
        `;

        const inputEl = content.querySelector('.console-input');
        const outputLineEl = content.querySelector('.output-line');
        const outputEl = content.querySelector('.console-output');
        const cursor = content.querySelector('.typing-cursor');

        const inputText = messageData.input;
        let inputHTML = '';
        for (let i = 0; i < inputText.length; i++) {
            inputHTML += `<span class="input-char">${inputText[i]}</span>`;
        }
        inputEl.innerHTML = inputHTML;

        const inputChars = inputEl.querySelectorAll('.input-char');
        let inputCharIndex = 0;

		function updateCursorPosition(targetElement) {
			if (!targetElement) return;

			const rect = targetElement.getBoundingClientRect();
			const contentRect = content.getBoundingClientRect();

			// Horizontal center stays the same
			cursor.style.left = (rect.left - contentRect.left + rect.width / 2 - 3) + 'px';

			// Get font size from computed style
			const computed = window.getComputedStyle(targetElement);
			const fontSize = parseFloat(computed.fontSize);

			// Estimate baseline offset (roughly *-.15 fontSize from the top of the box? I tried .75 first then realized it was too much lol, so i did inverse, 15 instead of 75? worked fine!)
			const baselineOffset = fontSize * -.15;

			// Position cursor near text baseline instead of the bottom of the rect
			cursor.style.top = (rect.top - contentRect.top + baselineOffset) + 'px';
		}

        function typeInputChar() {
            if (inputCharIndex < inputChars.length) {
                inputChars[inputCharIndex].classList.add('visible');
                updateCursorPosition(inputChars[inputCharIndex]);
                inputCharIndex++;
                setTimeout(typeInputChar, INPUT_TYPING_SPEED);
            } else {
                setTimeout(() => {
                    face.classList.add('showing-output');
                    outputLineEl.style.display = 'block';
                    outputEl.classList.add('typing');

                    let outputHTML = '';
                    let totalChars = 0;
                    
                    lines.forEach((line, lineIdx) => {
                        outputHTML += '<div class="console-output-line">';
                        line.forEach(segment => {
                            totalChars += segment.text.length;
                            if (segment.text === ' ') {
                                outputHTML += `<span class="char c-${segment.color}">&nbsp;</span>`;
                            } else {
                                for (let i = 0; i < segment.text.length; i++) {
                                    outputHTML += `<span class="char c-${segment.color}">${segment.text[i]}</span>`;
                                }
                            }
                        });
                        outputHTML += '</div>';
                    });

                    outputEl.innerHTML = outputHTML;

                    const firstOutputChar = outputEl.querySelector('.char');
                    if (firstOutputChar) {
                        updateCursorPosition(firstOutputChar);
                    }

                    const chars = outputEl.querySelectorAll('.char');
                    let charIndex = 0;

                    function typeNextChar() {
                        if (charIndex < chars.length) {
                            chars[charIndex].classList.add('visible');
                            updateCursorPosition(chars[charIndex]);
                            charIndex++;
                            setTimeout(typeNextChar, OUTPUT_TYPING_SPEED);
                        } else {
                            cursor.style.display = 'none';
                            const waitTime = calculateReadWaitTime(totalChars);
                            setTimeout(() => {
                                face.classList.remove('showing-output');
                                callback();
                            }, waitTime);
                        }
                    }

                    typeNextChar();
                }, INPUT_WAIT_TIME);
            }
        }

        setTimeout(() => {
            cursor.style.display = 'inline';
            const labelEl = content.querySelector('.console-label');
            if (labelEl) {
                const rect = labelEl.getBoundingClientRect();
                const contentRect = content.getBoundingClientRect();
                cursor.style.left = (rect.right - contentRect.left + 5) + 'px';
                cursor.style.top = (rect.bottom - contentRect.top - 2) + 'px';
            }
            typeInputChar();
        }, 10);
    }

	function rotateToCube(faceIndex, callback) {
		consoleBox.classList.remove('rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-reset');

		// temporarily remove border during rotation
		consoleBox.classList.add('rotating');

		if (faceIndex === 'reset') {
			consoleBox.classList.add('rotate-reset');
		} else {
			consoleBox.classList.add(`rotate-${faceIndex}`);
		}

		setTimeout(() => {
			consoleBox.classList.remove('rotating');
			if (callback) callback();
		}, 1000);
	}

    function startConsoleRotation() {
        if (isAnimating) return;
        isAnimating = true;
        
        const faceIndex = contentFaceIndices[currentFace];
        const face = consoleFaces[faceIndex];
        const messageData = messages[currentFace];

        console.log(`[CYCLE START] currentFace=${currentFace}, using physicalFace=${faceIndex}`);
        
        if (!face) {
            console.error(`ERROR: Face ${faceIndex} not found!`);
            isAnimating = false;
            return;
        }
        
        const content = face.querySelector('.console-content');
        if (!content) {
            console.error(`ERROR: Content div not found on face ${faceIndex}!`);
            isAnimating = false;
            return;
        }

        showInputThenOutput(face, messageData, () => {
            console.log(`[ANIMATION DONE] Completed face ${currentFace} (physical ${faceIndex}), starting rotation`);
            
            currentFace = (currentFace + 1) % 4;
            console.log(`[NEXT FACE] Moving to face ${currentFace}`);
            
            if (currentFace === 0) {
                console.log('[RESET] Resetting cube to 0deg');
                rotateToCube('reset', () => {
                    setTimeout(() => {
                        content.innerHTML = '';
                        face.classList.remove('showing-output');
                        console.log('[CLEARED] Content cleared during reset rotation');
                    }, 500);
                    
                    setTimeout(() => {
                        consoleBox.classList.remove('rotate-reset');
                        consoleBox.classList.add('rotate-0');
                        setTimeout(() => {
                            console.log('[READY] Reset complete, ready for next animation');
                            isAnimating = false;
                            startConsoleRotation();
                        }, 50);
                    }, 50);
                });
            } else {
                console.log(`[ROTATE] Rotating to position ${currentFace}`);
                rotateToCube(currentFace, () => {
                    setTimeout(() => {
                        content.innerHTML = '';
                        face.classList.remove('showing-output');
                        console.log('[CLEARED] Content cleared during rotation');
                    }, 500);
                    
                    console.log(`[COMPLETE] Rotation to face ${currentFace} complete`);
                    isAnimating = false;
                    startConsoleRotation();
                });
            }
        });
    }

    function handleMobileGlow() {
        if (window.innerWidth <= 768) {
            consoleFaces.forEach(face => face.classList.add('mobile-glow'));
        } else {
            consoleFaces.forEach(face => face.classList.remove('mobile-glow'));
        }
    }

    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            applyResponsiveStyles();
            handleMobileGlow();
        }, 100);
    }

    applyResponsiveStyles();
    handleMobileGlow();
    window.addEventListener('resize', handleResize);

    [0, 4, 1, 5].forEach(faceIndex => {
        const face = consoleFaces[faceIndex];
        if (face && !face.querySelector('.console-content')) {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'console-content';
            face.appendChild(contentDiv);
        }
    });
    
    console.log('[INIT] Starting 3D console rotation');
    setTimeout(() => {
        consoleBox.classList.add('rotate-0');
        setTimeout(() => {
            startConsoleRotation();
        }, 500);
    }, 100);
});
