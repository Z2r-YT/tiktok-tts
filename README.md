# tiktok-tts 

A modern web application for generating text-to-speech audio files using TikTok's TTS API. Available both as an npm package and as a web application deployable on Vercel.

![example workflow](https://github.com/Steve0929/tiktok-tts/actions/workflows/publish_workflow.yml/badge.svg)
![downloads](https://img.shields.io/npm/dm/tiktok-tts.svg?color=5f63f1)

## 🌐 Web Application

### Live Demo
Visit the live web application: [Deploy your own to Vercel](#deployment-on-vercel)

### Features
- **Voice Selection**: Choose between 'Wukong' and 'Pigsy' male voices
- **Text Input**: Enter any text to be converted to speech
- **Audio Playback**: Listen to generated audio directly in the browser
- **Download**: Save the generated MP3 file to your device
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS

### Deployment on Vercel

1. **Fork this repository** to your GitHub account

2. **Get your TikTok Session ID**:
   - Install [Cookie Editor extension](https://cookie-editor.cgagnier.ca) for your browser
   - Log in to [TikTok Web](https://tiktok.com)
   - While on TikTok web, open the extension and look for `sessionid`
   - Copy the `sessionid` value (should be an alphanumeric value)

3. **Deploy to Vercel**:
   - Visit [Vercel](https://vercel.com) and sign in with your GitHub account
   - Click "New Project" and select your forked repository
   - Add the environment variable:
     - **Name**: `TIKTOK_SESSION_ID`
     - **Value**: Your copied TikTok session ID
   - Click "Deploy"

4. **Your app will be live** at the provided Vercel URL!

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/tiktok-tts.git
cd tiktok-tts

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your TikTok session ID to .env.local
# TIKTOK_SESSION_ID=your_session_id_here

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run tests
npm test
```

---

## 📦 NPM Package Usage

This package also provides a simple Node.js API for generating TTS audio files programmatically.


## Installation
```javascript
npm i tiktok-tts
```

## Usage

### Basic example
```javascript
const { config, createAudioFromText } = require('tiktok-tts')

config('Your TikTok sessionid here');
createAudioFromText('Text to be spoken goes here');
```

### Custom filename example
```javascript
const { config, createAudioFromText } = require('tiktok-tts')

config('Your TikTok sessionid here');
createAudioFromText('Text to be spoken goes here', 'myAudio');
```
Generated audio file will be saved as ```myAudio.mp3```

### Custom path example
```javascript
const { config, createAudioFromText } = require('tiktok-tts')

config('Your TikTok sessionid here');
createAudioFromText('Text to be spoken goes here', './myDirectory/myAudio');
```
Generated audio file will be saved as ```myAudio.mp3``` inside the ```myDirectory``` directory.
###### ⚠️ Please keep in mind that ```myDirectory``` needs to be an existing directory.

### Custom voice example
```javascript
const { config, createAudioFromText } = require('tiktok-tts')

config('Your TikTok sessionid here');
createAudioFromText('Text to be spoken goes here', 'myAudio', 'en_us_stormtrooper');
```

### Using ```await``` with the ```createAudioFromText()``` function

```javascript
const { config, createAudioFromText } = require('tiktok-tts')

config('Your TikTok sessionid here');

async function yourFunction(){
    await createAudioFromText('Text that will be spoken');
    console.log("Audio file generated!");
}

yourFunction();
```

## Get TikTok Session id 🍪
- Install [Cookie Editor extension](https://cookie-editor.cgagnier.ca) for your browser.
- Log in to [TikTok Web](https://tiktok.com)
- While on TikTok web, open the extension and look for ```sessionid```
- Copy the ```sessionid``` value. (It should be an alphanumeric value)

## Available functions
```javascript
config(tiktokSessionId, customBaseUrl)
```
| Parameter     | Description             | Default   |type |
| ------------- |:-------------           | ------------------    |-----|
| tiktokSessionId| Your TikTok sessionid | ```null``` | String|
| customBaseUrl| Custom TikTok API url ```optional```  | ```-``` | String|

* By default ```https://api16-normal-c-useast1a.tiktokv.com/media/api/text/speech/invoke``` will be used if no ```customBaseUrl``` is specified.
<details>
    <summary>List of known URLs (You can try these if the default url is not working on your region)</summary>
    
   - https://api16-normal-c-useast1a.tiktokv.com/media/api/text/speech/invoke
    
   - https://api16-core-c-useast1a.tiktokv.com/media/api/text/speech/invoke
     
   - https://api16-normal-useast5.us.tiktokv.com/media/api/text/speech/invoke
     
   - https://api16-core.tiktokv.com/media/api/text/speech/invoke
     
   - https://api16-core-useast5.us.tiktokv.com/media/api/text/speech/invoke
     
   - https://api19-core-c-useast1a.tiktokv.com/media/api/text/speech/invoke
     
   - https://api-core.tiktokv.com/media/api/text/speech/invoke
     
   - https://api-normal.tiktokv.com/media/api/text/speech/invoke
     
   - https://api19-normal-c-useast1a.tiktokv.com/media/api/text/speech/invoke
     
   - https://api16-core-c-alisg.tiktokv.com/media/api/text/speech/invoke
     
   - https://api16-normal-c-alisg.tiktokv.com/media/api/text/speech/invoke
     
   - https://api22-core-c-alisg.tiktokv.com/media/api/text/speech/invoke
     
   - https://api16-normal-c-useast2a.tiktokv.com/media/api/text/speech/invoke
</details>

<br/>

```javascript
createAudioFromText(text, fileName, speaker)
```

| Parameter     | Description | Default  |  type |
| ------------- |:-------------| -----| -----|
| text | Text to be converted to audio | ```null``` | String|
| fileName | filename/path for the generated audio file ```optional``` | ```audio``` | String|
| speaker | TikTok speaker code ```optional``` | ```en_us_001``` | String|

## Speaker Codes
The following speaker codes are supported:

| Language      | Speaker                 | Speaker Code                    |
|-------------  |-------------------------|---------------------------------|
| English       | Game On                 | en_male_jomboy                  |
|               | Jessie                  | en_us_002                       |
|               | Warm                    | es_mx_002                       |
|               | Wacky                   | en_male_funny                   |
|               | Scream                  | en_us_ghostface                 |
|               | Empathetic              | en_female_samc                  |
|               | Serious                 | en_male_cody                    |
|               | Beauty Guru             | en_female_makeup                |
|               | Bestie                  | en_female_richgirl              |
|               | Trickster               | en_male_grinch                  |
|               | Joey                    | en_us_006                       |
|               | Story Teller            | en_male_narration               |
|               | Mr. GoodGuy             | en_male_deadpool                |
|               | Narrator                | en_uk_001                       |
|               | Male English UK         | en_uk_003                       |
|               | Metro                   | en_au_001                       |
|               | Alfred                  | en_male_jarvis                  |
|               | ashmagic                | en_male_ashmagic                |
|               | olantekkers             | en_male_olantekkers             |
|               | Lord Cringe             | en_male_ukneighbor              |
|               | Mr. Meticulous          | en_male_ukbutler                |
|               | Debutante               | en_female_shenna                |
|               | Varsity                 | en_female_pansino               |
|               | Marty                   | en_male_trevor                  |
|               | Pop Lullaby             | en_female_f08_twinkle           |
|               | Classic Electric        | en_male_m03_classical           |
|               | Bae                     | en_female_betty                 |
|               | Cupid                   | en_male_cupid                   |
|               | Granny                  | en_female_grandma               |
|               | Cozy                    | en_male_m2_xhxs_m03_christmas   |
|               | Author                  | en_male_santa_narration         |
|               | Caroler                 | en_male_sing_deep_jingle        |
|               | Santa                   | en_male_santa_effect            |
|               | NYE 2023                | en_female_ht_f08_newyear        |
|               | Magician                | en_male_wizard                  |
|               | Opera                   | en_female_ht_f08_halloween      |
|               | Euphoric                | en_female_ht_f08_glorious       |
|               | Hypetrain               | en_male_sing_funny_it_goes_up   |
|               | Melodrama               | en_female_ht_f08_wonderful_world|
|               | Quirky Time             | en_male_m2_xhxs_m03_silly       |
|               | Peaceful                | en_female_emotional             |
|               | Toon Beat               | en_male_m03_sunshine_soon       |
|               | Open Mic                | en_female_f08_warmy_breeze      |
|               | Jingle                  | en_male_m03_lobby               |
|               | Thanksgiving            | en_male_sing_funny_thanksgiving |
|               | Cottagecore             | en_female_f08_salut_damour      |
|               | Professor               | en_us_007                       | 
|               | Scientist               | en_us_009                       |
|               | Confidence              | en_us_010                       |
|               | Smooth                  | en_au_002                       |
| Disney      | Ghost Face                 | en_us_ghostface               |
|             | Chewbacca                  | en_us_chewbacca               |
|             | C3PO                       | en_us_c3po                    |
|             | Stitch                     | en_us_stitch                  |
|             | Stormtrooper               | en_us_stormtrooper            |
|             | Rocket                     | en_us_rocket                  |
|             | Madame Leota               | en_female_madam_leota         |
|             | Ghost Host                 | en_male_ghosthost             |
|             | Pirate                     | en_male_pirate                |
| French      | French - Male 1            | fr_001                        |
|             | French - Male 2            | fr_002                        |
| Spanish     | Spanish (Spain) - Male     | es_002                        |
|             | Spanish MX - Male          | es_mx_002                     |
| Portuguese  | Portuguese BR - Female 1   | br_001                        |
|             | Portuguese BR - Female 2   | br_003                        |
|             | Portuguese BR - Female 3   | br_004                        |
|             | Portuguese BR - Male       | br_005                        |
|             | Ivete Sangalo              | bp_female_ivete               |
|             | Ludmilla                   | bp_female_ludmilla            |
|             | Lhays Macedo               | pt_female_lhays               |
|             | Laizza                     | pt_female_laizza              |
|             | Galvão Bueno               | pt_male_bueno                 |
| German      | German - Female            | de_001                        |
|             | German - Male              | de_002                        |
| Indonesian  | Indonesian - Female        | id_001                        |
| Japanese    | Japanese - Female 1        | jp_001                        |
|             | Japanese - Female 2        | jp_003                        |
|             | Japanese - Female 3        | jp_005                        |
|             | Japanese - Male            | jp_006                        |
|             | りーさ                      | jp_female_fujicochan          |
|             | 世羅鈴                      | jp_female_hasegawariona       |
|             | Morio’s Kitchen            | jp_male_keiichinakano         |
|             | 夏絵ココ                    | jp_female_oomaeaika           |
|             | 低音ボイス                  | jp_male_yujinchigusa          |
|             | 四郎                        | jp_female_shirou             |
|             | 玉川寿紀                    | jp_male_tamawakazuki          |
|             | 庄司果織                    | jp_female_kaorishoji         |
|             | 八木沙季                    | jp_female_yagishaki          |
|             | ヒカキン                    | jp_male_hikakin              |
|             | 丸山礼                      | jp_female_rei                |
|             | 修一朗                      | jp_male_shuichiro            |
|             | マツダ家の日常               | jp_male_matsudake            |
|             | まちこりーた                 | jp_female_machikoriiita      |
|             | モジャオ                    | jp_male_matsuo                |
|             | モリスケ                    | jp_male_osada                 |
| Korean      | Korean - Male 1            | kr_002                        |
|             | Korean - Female            | kr_003                        |
|             | Korean - Male 2            | kr_004                        |
| Vietnamese  | Female                     | BV074_streaming               |
|             | Male                       | BV075_streaming               |
| Other       | Alto                       | en_female_f08_salut_damour    |
|             | Tenor                      | en_male_m03_lobby             |
|             | Sunshine Soon              | en_male_m03_sunshine_soon     |
|             | Warmy Breeze               | en_female_f08_warmy_breeze    |
|             | Glorious                   | en_female_ht_f08_glorious     |
|             | It Goes Up                 | en_male_sing_funny_it_goes_up |
|             | Chipmunk                   | en_male_m2_xhxs_m03_silly        |
|             | Dramatic                   | en_female_ht_f08_wonderful_world |
