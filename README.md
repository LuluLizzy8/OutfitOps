# OutfitOps

This repo now contains both the research notebooks for outfit compatibility and a Vercel-ready Next.js demo for showing the project in action.

## Web app

The web app lives in this repo root and is powered by the App Router files under `app/`.

It includes:

- A gallery of real notebook-exported compatibility figures.
- A browser playground that mixes curated garment crops.
- A short explanation of the YOLO -> ResNet18 -> outfit scoring pipeline.

### Run locally

```bash
npm install
npm run dev
```

### Build for production

```bash
npm run build
```

### Deploy to Vercel

Import this folder as the Vercel project root and keep the default Next.js settings.

## Research assets

The original research files are still here:

- `Outfit_Compatibility_Code.ipynb`
- `YOLO_finetuned_basic.ipynb`
- `YOLO_finetuned_llm.ipynb`
- `Subset_Extraction_Code/`
- `Outfit_Compatibility_Outputs/`

## Dataset workflow

### Step 1: Place DeepFashion2 here

```text
DeepFashion2/
  train/
  val/
  test/
```

### Step 2: Prepare subsets

Run `Subset_Extraction_Code/deepfashion2_to_coco.py` and `Subset_Extraction_Code/make_subset.py`.

### Step 3: Run the notebooks

The notebooks were developed around Colab-style paths and assume the prepared dataset artifacts already exist.

## External asset links

### DeepFashion2 subsets

- `subset_500.zip`
  https://drive.google.com/file/d/13oboCvpbsQ0Aw7JBMhTzgEcJ-hbPtrlW/view?usp=drive_link
- `subset_5000_v2.zip`
  https://drive.google.com/file/d/1kDe3lI8o68XBEKO8a_LtF2DbNSFFpqId/view?usp=drive_link
- `df2_subset_5000.zip`
  https://drive.google.com/file/d/1ZOJLFNtjlTdgfOpSvnB043iHU1fKBAw5/view?usp=drive_link

### Polyvore subset

- `polyvore_subset_5000.zip`
  https://drive.google.com/file/d/1-rxVqZt-77M7m1NxcYcMvl3zHJ4ovdia/view?usp=drive_link

### Model output

- `resnet18-shop-weights`
  https://drive.google.com/drive/folders/1AhjRQxFGxLg8WHOshQA6cIKcZ1SiUJtX?usp=drive_link
