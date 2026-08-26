# Mechanical Design Engineer Portfolio

Welcome to the Krishna Kumar Portfolio source code. This is a high-performance, React-based web application with native 3D WebGL rendering (Three.js), designed specifically for mechanical and CAD engineers to showcase their work interactively.

This guide will teach you exactly how to update your models, edit text, and manage your projects without needing to touch any complex code.

---

## 🔗 Personal Links — Keep These Updated!

These are hardcoded links inside the source code. **Whenever your profile URL changes, update them here.**

| Link | Current Value | File to Edit |
|------|--------------|--------------|
| **LinkedIn Profile** | `https://www.linkedin.com/in/krishna-kumar-6540b9249` | `client/src/components/Hero.tsx`, `client/src/components/Contact.tsx`, and `client/src/components/Footer.tsx` |
| **Email Address** | `Kishansaxena753@gmail.com` | `client/src/components/Hero.tsx`, `client/src/components/Contact.tsx`, and `client/src/components/Footer.tsx` |
| **Phone Number** | `+91-7522035943` | `client/src/components/Contact.tsx` |
| **Resume / CV** | `client/public/resume.pdf` | Replace the file at this path |
| **Profile Photo** | `client/public/profile.png` | Replace the file at this path |

> **Tip:** To find and replace a link globally, press `Ctrl+Shift+H` in VS Code and search for the old URL.

---

## 📂 Data Architecture (Where things live)

All of the data that powers the website (Images, JSON files, and 3D STL Models) lives inside the **`client/public/`** folder. The website dynamically reads from these folders to render everything.

```text
client/public/
│
├── introduction_model/        <-- The 3D model shown on the very front page (Hero section)
│   └── intro.STL              
│
├── profile.png                <-- Your profile picture on the front page
├── resume.pdf                 <-- The resume downloaded when clicking "Download Resume"
│
└── projects/                  <-- Where ALL your case studies live
    ├── 1/                     <-- Folder for Project #1
    │   ├── images/
    │   │   └── 1_img.png      <-- Thumbnail image for Project #1
    │   ├── json/
    │   │   └── 1.json         <-- The text, details, and subpart configuration for Project #1
    │   └── models/
    │       ├── 1.STL          <-- The main assembly CAD model
    │       ├── 1.1.STL        <-- Subpart model (e.g. Clamping Unit)
    │       └── 1.2.STL        <-- Subpart model (e.g. Base Frame)
    │
    ├── 2/                     <-- Folder for Project #2
    └── 3/                     <-- Folder for Project #3
```

---

## 🛠️ How to Edit or Add a Project

To edit an existing project, or add a brand new one, simply manipulate the folders inside `client/public/projects/`. 

### Step 1: The JSON File (Text and Details)
Navigate to `client/public/projects/1/json/1.json`. This file controls the title, description, and all the text shown on the right side of the Case Study page. 

You can edit this file in any text editor. It looks like this:
```json
{
  "title": "Welding Fixture Assembly",
  "category": "Fixture Design",
  "industry": "Automotive",
  "difficulty": "Advanced",
  "description": "Short summary of the project.",
  "modelFile": "1.STL",
  "image": "/projects/1/images/1_img.png",
  "sections": [
    {
      "title": "Objective",
      "content": "Design a highly accurate welding fixture..."
    }
  ],
  "subparts": [
    {
      "id": "sub1",
      "name": "Base Fixture Frame",
      "modelFile": "1.1.STL"
    }
  ]
}
```

### Step 2: Adding Subparts for the "View Subparts" Animation
If your project has sub-assemblies that you want to show when the user clicks **"View Subparts"**, you must:
1. Export your sub-assemblies as **`.STL`** files.
2. Place them in the `client/public/projects/1/models/` folder and name them sequentially (`1.1.STL`, `1.2.STL`, etc.).
3. Open your `1.json` file and add them to the `"subparts"` array exactly as shown in the example above. The `"name"` is what the button will say, and `"modelFile"` tells the website which file to load.

### Step 3: Changing the 3D Model
The 3D engine only accepts **`.STL`** files. 
- **Main Assembly:** Place your main `.STL` file in `client/public/projects/1/models/` and name it `1.STL`.
- **Hero/Front Page Model:** Replace the `intro.STL` file located in `client/public/introduction_model/`.

*Note: Ensure your STL files are exported in "Binary" format rather than "ASCII" to keep file sizes small and loading times blazing fast.*

### Step 4: Changing the Thumbnail Image
Replace the image in `client/public/projects/1/images/1_img.png`. This is the image that shows up on the horizontally scrolling list on the home page.

---

## 🚀 How to Add a Completely New Project (Project 4)

If you want to add a 4th project:
1. Create a new folder named `4` inside `client/public/projects/`.
2. Inside `4`, create three folders: `images`, `json`, and `models`.
3. Copy the `1.json` file into `4/json/` and rename it to `4.json`. Edit the text to match your new project.
4. Add your thumbnail image as `4/images/4_img.png`.
5. Add your `.STL` files into `4/models/`.

The website automatically scans folders sequentially (1, 2, 3, 4...) and will instantly detect and add Project 4 to the homepage.

---

## 💻 Development Commands

If you need to run the website locally on your computer to test your new models before publishing them:

**Start the Local Server:**
```bash
npm run dev
```
*(Then click the `http://localhost:5173` link that appears in your terminal)*

**Publish Updates to the Live Website:**
Once you are happy with the changes you made to the JSON or models, simply run:
```bash
git add .
git commit -m "Updated CAD models"
git push
```
GitHub Actions will automatically build and deploy your changes to your live link.

---

## 🎨 Modifying the Theme and UI
If you ever want to change the text colors, background gradients, or global theme colors, open:
`client/src/index.css`

Inside the `:root` and `.dark` blocks, you will find CSS variables like `--primary: #C17A45;` which controls the copper/orange accent color across the entire website.

The **default theme is dark**. To change the default back to light, open `client/src/App.tsx` and change `defaultTheme="dark"` to `defaultTheme="light"`.

---

## 📱 Mobile Support
The website is fully responsive and works on mobile devices. The navigation bar collapses into a hamburger (☰) menu on small screens. All sections are optimized for mobile viewports.
