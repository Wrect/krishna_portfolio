# 🏗️ Krishna Kumar — Mechanical Design Engineer Portfolio

Welcome! This is your personal portfolio website. It shows off your engineering work with cool 3D models that people can spin around right in their browser.

🌐 **Your Live Website:** [https://wrect.github.io/krishna_portfolio/](https://wrect.github.io/krishna_portfolio/)

---

## 🔗 Your Personal Links

These links appear on your website. If any of them ever change, you need to update them in these files:

| What | Current Value | Where to Change It |
|------|---------------|--------------------|
| **LinkedIn** | `https://www.linkedin.com/in/krishna-kumar-6540b9249` | `client/src/components/Hero.tsx`, `Contact.tsx`, `Footer.tsx` |
| **Email** | `Kishansaxena753@gmail.com` | `Hero.tsx`, `Contact.tsx`, `Footer.tsx` |
| **Phone** | `+91-7522035943` | `Contact.tsx` |
| **Resume PDF** | `client/public/resume.pdf` | Just replace this file with your new PDF |
| **Profile Photo** | `client/public/profile.png` | Just replace this file with your new photo |

> 💡 **Easy trick:** In VS Code, press `Ctrl+Shift+H` to search and replace text across ALL files at once.

---

## 📂 Where Everything Lives

Think of your website like a filing cabinet. All the important stuff is inside the `client/public/` folder:

```
client/public/
│
├── profile.png              ← Your face! The photo on the front page.
├── resume.pdf               ← The PDF people download when they click "Download CV"
│
├── introduction_model/
│   └── intro.STL            ← The 3D model that spins on the front page
│
└── projects/                ← All your projects live here
    ├── 1/                   ← Project #1
    │   ├── images/
    │   │   └── 1_img.png    ← The little preview picture for Project #1
    │   ├── json/
    │   │   └── 1.json       ← All the text/details for Project #1
    │   └── models/
    │       ├── 1.STL        ← The main 3D model
    │       ├── 1.1.STL      ← A sub-part (like just the base)
    │       └── 1.2.STL      ← Another sub-part
    │
    ├── 2/                   ← Project #2 (same structure)
    └── 3/                   ← Project #3 (same structure)
```

---

# 🍼 Super Easy Guide: How to Edit Your Website (Zero Coding Knowledge Needed!)

Don't worry — you do NOT need to know how to code. Think of it like editing a Word document. Follow the steps below like a recipe. 🍳

---

## ✏️ Step 1: Change Your Profile Photo

**What you need:** A new photo of yourself (`.png` or `.jpg`)

1. Find the file `client/public/profile.png` on your computer.
2. Delete it (or rename it to `profile_old.png` if you want to keep a backup).
3. Put your new photo in the exact same spot and name it **`profile.png`**.
4. That's it! 🎉

---

## 📄 Step 2: Change Your Resume PDF

1. Find the file `client/public/resume.pdf`.
2. Delete it.
3. Put your new resume PDF in the same spot and name it **`resume.pdf`**.
4. Done! When people click "Download CV" on your website, they'll get your new resume.

---

## 🔧 Step 3: Edit a Project's Text and Details

Each project has a tiny text file (called a `.json` file) that controls ALL the words on that project's page.

**To edit Project #1:**

1. Open the file: `client/public/projects/1/json/1.json`
2. You can open it with **Notepad**, **VS Code**, or any text editor.
3. You'll see something like this:

```json
{
  "title": "Welding Fixture Assembly",
  "category": "Fixture Design",
  "industry": "Automotive",
  "description": "A short summary of your project goes here.",
  "modelFile": "1.STL",
  "image": "/projects/1/images/1_img.png"
}
```

4. Change the words inside the `" "` quotes. For example, change `"Welding Fixture Assembly"` to `"My New Project Name"`.
5. **⚠️ Important rules:**
   - DON'T delete the `{ }` curly brackets.
   - DON'T delete the commas `,` between lines.
   - DON'T delete the `" "` quote marks around words.
   - Only change the text INSIDE the quotes.
6. Save the file. ✅

---

## 🖼️ Step 4: Change a Project's Preview Image

The preview image is the picture people see on the homepage when scrolling through projects.

1. Go to `client/public/projects/1/images/`.
2. Delete the old `1_img.png`.
3. Put your new image in the same folder and name it **`1_img.png`**.

---

## 🎮 Step 5: Change a Project's 3D Model

The 3D model is the spinning thing people can rotate on the project page!

1. Export your CAD model from CATIA/SolidWorks as an **`.STL`** file (choose **Binary** format, not ASCII — it's faster).
2. Go to `client/public/projects/1/models/`.
3. Delete the old `1.STL`.
4. Put your new STL file there and name it **`1.STL`**.

**Want to change the front page spinning model?**
- Replace `client/public/introduction_model/intro.STL` with your new file.

---

## ➕ Step 6: Add a Brand New Project (e.g., Project #4)

1. Go to the `client/public/projects/` folder.
2. Create a new folder called **`4`**.
3. Inside the `4` folder, create three sub-folders: **`images`**, **`json`**, and **`models`**.
4. Copy the file `1.json` from `projects/1/json/` into your new `projects/4/json/` folder.
5. Rename the copy to **`4.json`**.
6. Open `4.json` and change all the text to describe your new project.
7. Change `"modelFile": "1.STL"` to `"modelFile": "4.STL"`.
8. Change `"image": "/projects/1/images/1_img.png"` to `"image": "/projects/4/images/4_img.png"`.
9. Put your preview image in `projects/4/images/4_img.png`.
10. Put your 3D model in `projects/4/models/4.STL`.

The website will **automatically** detect and show your new project! 🚀

---

# 🌐 How to Put Your Changes on the Live Website (Deploy)

After you make any changes, you need to "push" them to GitHub so the website updates. Here's how:

### First Time Setup (Only do this ONCE)

1. **Download and install Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads) — just click Next → Next → Install.
2. **Download and install Node.js:** [https://nodejs.org](https://nodejs.org) — pick the green "LTS" button. Click Next → Next → Install.
3. **Download and install VS Code:** [https://code.visualstudio.com](https://code.visualstudio.com) — this is a free text editor.

### Every Time You Want to Update the Website

1. **Open VS Code**.
2. Click **Terminal** in the top menu → click **New Terminal**. A black box appears at the bottom.
3. Type these commands one by one, pressing **Enter** after each:

```bash
git add .
```
> ☝️ This tells Git: "Hey, I changed some files!"

```bash
git commit -m "Updated my project"
```
> ☝️ This saves a snapshot of your changes. You can change the message in the `" "` to whatever you want (like `"New profile photo"` or `"Added project 4"`).

```bash
git push
```
> ☝️ This sends your changes to GitHub. The website will automatically rebuild itself in about 1-2 minutes!

4. **Wait 1-2 minutes**, then refresh your website link: [https://wrect.github.io/krishna_portfolio/](https://wrect.github.io/krishna_portfolio/)
5. Your changes are live! 🎉🎉🎉

### ⚠️ If `git push` asks for a password:
- GitHub doesn't use passwords anymore. You need a **token**.
- Go to [github.com/settings/tokens/new](https://github.com/settings/tokens/new).
- Give it a name like `my-token`, check the **`repo`** box, scroll down, click **Generate token**.
- Copy the token (starts with `ghp_...`) and paste it when asked for the password.

---

## 👀 How to Preview Changes Before Publishing

Want to see how your changes look BEFORE putting them on the internet? You can run the website on your own computer:

1. Open VS Code and the Terminal (as described above).
2. Type:
```bash
npm run dev
```
3. A link will appear like `http://localhost:5173`. Click it!
4. Your website opens in your browser — but it's only on YOUR computer, nobody else can see it yet.
5. Make changes, save files, and the page automatically updates in your browser!
6. When you're happy, follow the **deploy** steps above to push it live.

---

## 🎨 Changing the Theme Color

The website currently uses **Crimson Red** (`#DC2626`) as the accent color.

If you want to change it (e.g., to blue or green):

1. Open the file: `client/src/index.css`.
2. Search for `#DC2626` (that's the red color code).
3. Replace it with a different color code. Here are some examples:
   - Blue: `#2563EB`
   - Green: `#16A34A`
   - Purple: `#9333EA`
   - Orange: `#EA580C`
4. You also need to search for `#B91C1C` (the darker red used for hover effects) and replace it with a slightly darker version of your chosen color.
5. Save the file and deploy!

> 💡 **Find color codes here:** [https://htmlcolorcodes.com](https://htmlcolorcodes.com) — just pick a color and copy the `#` code!

---

## 📱 Mobile Support

Your website works on phones and tablets too! The navigation bar turns into a hamburger menu (☰) on small screens, and everything adjusts to fit.

---

## 🆘 Something Broke? Don't Panic!

- **Website shows a blank page?** You probably have a typo in one of the `.json` files. Open it and check that all `{ }`, `" "`, and `,` are in the right places.
- **3D model not loading?** Make sure the file is `.STL` format and the filename matches what's in the `.json` file.
- **`git push` gives an error?** Check the "password/token" section above.
- **Need to undo everything?** Run `git checkout .` in the terminal — this resets ALL your files back to the last saved version.
