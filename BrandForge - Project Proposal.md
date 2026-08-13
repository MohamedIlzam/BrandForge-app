**Project Name:** BrandForge AI-assisted design tool 

**Track:** AI in Creative Industries 

**Team Name:** LarpingTechies 

**Working Prototype Link:** https://ratio-march-75777389.figma.site/ 

**Team Members:** 

**Shajeeve Balakrishnan – IT24610789** 

**Rithish Kanth R – IT24610797 Mohammed Ilzam – IT24610792** 

# Table of Contents 

|1. Problem Statement................................................................................................... 4|
|---|
|2. Solution Overview................................................................................................... 4|
|3. Key Features (Three-Step Flow)................................................................................ 5|
|4. What This Product is Not.......................................................................................... 6|
|5. Existing Solutions & Opportunities............................................................................ 6|
|Target Users............................................................................................................ 7|
|6. Risks and Mitigation................................................................................................ 7|
|7. Conclusion............................................................................................................. 8|



# 1. Problem Statement 

Small Businesses, student clubs, and solo funders need posters and flyers constantly for sales, events, and announcements. Their current options all fail them: 

- **Hire a designer:** slow and too expensive for a single flyer. 

- **DIY in Canva:** still requires design judgement, and brand consistency like logo placement, drifts over time because no system enforces it. 

- **Generic AI image generators** : produce pretty images but cannot render logos accurately. The output is unusable for real marketing. 

There is no tool that generates **on-brand, production-ready marketing collateral** from a single prompt. 

The following are some examples of badly generated images. 





# 2. Solution Overview 

An AI-powered web platform where the user types one prompt, supplies their logo and brand colors once, and instantly receives a polished flyer with perfectly placed logo, accurate colors, and clean readable text which is ready for print or sharing on social media. 

**Core insight:** We split the problem into two distinct parts. 

- **Creative part** → AI (headline copy + background art). 

- **Brand part** → Deterministic code (logo placement, color mapping) 

Mixing image generation and text based is why generic AI tools fail. By keeping text always outside the generated image, we completely avoid garbled text. 

# 3. Key Features (Three-Step Flow) 

## **Step 1 – Generate** 

- User enters a short text prompt. 

- An LLM produces a headline and a tagline. 

- An image generation model creates a background image with **no text baked in** (eliminates garbled text). 

- The user never sees AI-generated text inside the image — only as separate, editable text blocks. 

## **Step 2 – Brand** 

- User uploads a logo and picks brand colors once (stored locally in the browser). 

- Deterministic compositing (HTML5 Canvas / SVG) places the logo in a fixed safe zone that never overlaps content, never stretches or warps it. 

- Template accent elements (dividers, buttons) are recolored exactly to the brand palette. 

- The AI-written headline and tagline are overlaid as crisp, web-standard text with correct font styling. 

## **Step 3 – Export** 

- One-click resize into preset formats: A4 print flyer, Instagram post (1:1), digital poster (9:16). 

- Each format uses layout rules (not naive scaling) so text and logo reposition/resize proportionally, avoiding overflow or overlap. 

- Output is downloadable as a print-ready PDF or high-res PNG. 

# 4. What This Product is Not 

We scoped this project to not have: 

1. **Background removal:** this is a commodity feature, not important to prove our goals. 

2. **Brand advisory features:** this is entirely different product direction. 

3. **Multi-user accounts, teams, cloud storage:** everything stays in browser’s local storage environment. 

4. **A general-purpose design engine:** we designed this product to only have 2-3 export formats and a small set of rigidly controlled templates. 

# 5. Existing Solutions & Opportunities 

We evaluated the current alternatives: 

1. **Canva & similar template editors:** Require manual drag-and-drop, text editing, and color adjustment. Brand kits exist but still need the user to actively apply them correctly. Brand slip can happen naturally when rushed. 

2. **AI image generators:** Can create stunning visuals from prompts, but they are “black boxes.” They generate a flat raster image with everything baked, including garbled text, malformed logos, and approximate colors that don’t match hex values. Any attempt to add a logo afterwards 

3. **All-in-one AI design tools:** Good for first drafts but still show brand inconsistencies, and do not separate creative generation from deterministic branding. 

The gap is a system that structurally avoids the unreliability of generative AI for brand assets. No existing solution combines an LLM for copy, a text-free image generation for atmosphere, and a code-driven compositing engine that enforces precise brand rules. That combination is what makes our approach technically distinct. 

Target Users 

- **Primary:** Solo founders and micro-businesses like boutiques, freelancers or coffee shops who need 2-3 posters per week for social media and print. 

- **Secondary:** Student clubs and university societies that promote events with zero budgets for marketing and rotating volunteers, leading to enormous brand inconsistencies. 

- **Tertiary:** Early-stage startups that haven’t hired a marketer or designer yet must look credible. 

These users share a need for speed, brand consistency without effort, and output that is genuinely usable meaning, not just “good enough” AI art. 

# 6. Risks and Mitigation 

|**Risk**|**Mitigation**|
|---|---|
|AI service failure|Pre-generated fallback assets for demonstration|
|Garbled text|Never generate marketing text inside images|
|Logo distortion|Use original uploaded logo during composting|
|Incorrect brand colors|Apply exact color values programmatically|
|Layout problems across formats|Separate rules for each supported format|



# 7. Conclusion 

The proposed platform addresses a practical problem faced by small businesses, startups, student organizations, and independent creators when producing professional and brand-consistent marketing material quickly without requiring professional design skills. 

Its key technical contribution is the separation of creativity from precision. AI is used to generate the marketing copy and visual concept, while deterministic code controls the elements that must remain exact, including logos, colors, typography, layout, and export formats. 

By combining these approaches, the system aims to avoid the primary weaknesses of both traditional design workflows and generic AI image generation. Instead of producing an image that merely looks like a poster, the platform is designed to produce a **usable, brand-consistent marketing asset** . 

The long-term vision is to turn this workflow into an accessible cloud-based platform that allows small organizations and individuals to produce professional marketing collaterals quickly, consistently, and without requiring a dedicated designer. 

