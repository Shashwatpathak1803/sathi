"""
Copies the uploaded project photographs into src/assets/projects/<slug>/,
removes exact duplicates, resizes/compresses them for the web, and writes
src/data/images.js (the gallery + project photo data).

Run from the sathi-website folder:  python scripts/process_images.py
Requires Pillow:  pip install pillow
"""
import hashlib, json, os, re
from PIL import Image, ImageOps

SRC_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "assets", "projects"))
DATA_OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "data", "images.js"))
MAX_W, QUALITY = 1600, 80

# source folder -> project slug
FOLDERS = {
    "Maitri": "maitri",
    "MRC Banda": "mrc-banda",
    "ERW Photographs": "erw",
    "Mausam": "mausam",
    "SCOPE": "scope",
    "SMHM Project": "smhm",
    "TCR- Banda": "tcr-banda",
    "Nutrition Project Photographs": "nutrition",
}

# Caption overrides (source filename without extension -> caption)
CAPTIONS = {
    # Maitri
    "Baseline Assessment 1": "Baseline assessment with community members",
    "Baseline Assessment": "Baseline assessment in the village",
    "D2D Contect Cross Verifaction 1": "Door-to-door contact and cross-verification",
    "D2D Contect Cross Verifaction": "Door-to-door contact and cross-verification of household data",
    "D2D Contect": "Door-to-door contact with families",
    "Enrolment Releted School Visit 1": "School visit for enrolment follow-up",
    "Enrolment Releted School Visit": "Enrolment-related school visit",
    "Home Contect": "Home contact with a family",
    "Vidyasabha PS Adilpur 2": "Vidyasabha at Primary School Adilpur",
    "Vidyasabha PS Adilpur": "Vidyasabha at Primary School Adilpur",
    "Vidyasabha PS Ahran suvansh": "Vidyasabha at Primary School Ahran Suvansh",
    "Vidyasabha PS Dhema Shivbaxray 1": "Vidyasabha at Primary School Dhema Shivbaxray",
    "Vidyasabha PS Dhema Shivbaxray": "Vidyasabha at Primary School Dhema Shivbaxray",
    "Vidyasabha PS Paraspur sathra": "Vidyasabha at Primary School Paraspur Sathra",
    "Vidyasabha PS Pilai": "Vidyasabha at Primary School Pilai",
    "Vidyasabha PS Rurukhas": "Vidyasabha at Primary School Rurukhas",
    "Vidyasabha PS Sagarpatti": "Vidyasabha at Primary School Sagarpatti",
    "Vidyasabha PS Sahijanwa": "Vidyasabha at Primary School Sahijanwa",
    # MRC Banda
    "ADO Sir conducting a meeting at the VMKRC center_": "ADO conducting a meeting at the VMKRC centre",
    "Child Labor Campaign": "Child labour awareness campaign",
    "Child Labour Campaign(1)": "Child labour awareness campaign",
    "Child Labour Campaign(2)": "Child labour awareness campaign",
    "Child Labour Campaign": "Child labour awareness campaign",
    "Conducting a cluster-level meeting": "Cluster-level meeting",
    "Conducting an awareness campaign against child marriage_(1)": "Awareness campaign against child marriage",
    "Conducting an awareness campaign against child marriage_": "Awareness campaign against child marriage",
    "Conducting an awareness campaign on child labor": "Awareness campaign on child labour",
    "Coordinating with the AHTU in-charge": "Coordination with the AHTU in-charge",
    "Helpline Promotion": "Helpline promotion",
    "Labour Day": "Labour Day observance",
    "Lebour chauk_": "Outreach at the labour chowk",
    "Observing the Day Against Child Labour": "Observing the World Day Against Child Labour",
    "Promoting the helpline number(1)": "Promoting the helpline number",
    "Promoting the helpline number(2)": "Promoting the helpline number",
    "Promoting the helpline number": "Promoting the helpline number",
    "Promoting the helpline": "Promoting the helpline",
    "Providing information about social security schemes at VMKRC": "Information session on social security schemes at VMKRC",
    "Providing information about the old-age pension": "Information session on old-age pension",
    "Providing information on safe migration(1)": "Information session on safe migration",
    "Providing information on safe migration(2)": "Information session on safe migration",
    "Providing information on safe migration(3)": "Information session on safe migration",
    "Providing information on safe migration": "Information session on safe migration",
    "State Coordinator and Director Sir visiting VMKRC_": "State Coordinator and Director visiting VMKRC",
    "WhatsApp Image 2026-04-08 at 1.05.46 PM": "100-day intensive awareness campaign for Child Marriage Free Bharat at Gram Panchayat Atarra",
    "WhatsApp Image 2026-07-18 at 12.35.27 PM": "Labour helpline number displayed at Banda railway station with police and RPF staff",
    "coordinating with the Pradhan": "Coordination with the Gram Pradhan",
    # ERW
    "CLW mobilizing sangathan women through home visit to build awareness and collective empowerment": "Community Link Worker mobilising sangathan women through a home visit",
    "Collective celebration of International Women’s Day with strong community participation and solidarity": "Collective celebration of International Women's Day",
    "Community monitoring visit documenting work and community participation": "Community monitoring visit",
    "Empowering N.S leaders with knowledge of Women’s Rights and Legal Protections": "Nari Sangh leaders learning about women's rights and legal protections",
    "Hamlet level meeting with Nari Sangh women, creating space for dialogue,participation and collective action": "Hamlet-level meeting with Nari Sangh women",
    "Hamlet-level dialogue women raising voices, sharing concerns and driving collective action": "Hamlet-level dialogue: women raising concerns and planning collective action",
    "NS leaders facilitating community awareness and updating entitlement data on the flex": "Nari Sangh leaders updating entitlement data on the community flex board",
    "Nari Sangh Leaders’ Training on Domestic Violence, Dowry and Women’s Pro-tection Laws": "Nari Sangh leaders' training on domestic violence, dowry and women's protection laws",
    "Nari Sangh leader engaging with govt officials to raise individual and community concerns": "Nari Sangh leader engaging with government officials",
    "WhatsApp Image 2026-06-12 at 5.26.35 AM": "Women's collective meeting in the village",
    "purwa stariye naari Sangh baithak harirampur  (1)_page-0004": "Purwa-level Nari Sangh meeting at Harirampur",
    # Mausam
    "During OD Base Line": "Organisational development baseline exercise",
    "OD Base Line at MB Banda": "OD baseline at MB, Banda",
    "OD Base line At Disha Banda": "OD baseline at Disha, Banda",
    "OD Baseline of KSS_Banda": "OD baseline of KSS, Banda",
    "OD Baseline of SSS_Banda": "OD baseline of SSS, Banda",
    "OD Training of CSOs Partners 2": "OD training of CSO partners",
    "OD Training of CSOs Partners": "OD training of CSO partners",
    "Training On OD at Chachikpur": "Training on organisational development at Chachikpur",
    "Training on CIB of Field team (2)": "Training on CIB for the field team",
    "Training on CIB of Field team": "Training on CIB for the field team",
    "Training on OD": "Training on organisational development",
    # SCOPE
    "Adolescent Girls Economic Empowerment and Skill Development Program through Innovative activity": "Adolescent girls' economic empowerment and skill development programme",
    "Digital School throuhg Innovative activity by CSO": "Digital school: innovative learning activity by a partner CSO",
    "Exposure visit of partners CSOs to VSSM Ahmedabad": "Exposure visit of partner CSOs to VSSM, Ahmedabad",
    "One day refresher training to CSO heads and Accountants on Accounts and Finance Management": "Refresher training for CSO heads and accountants on finance management",
    "Quarterly Planning and review meeting": "Quarterly planning and review meeting",
    "Quarterly planning and review meeting": "Quarterly planning and review meeting",
    "Swaviswas- Monitring and handholding support to Partner CSO by SATHI-UP PSU team": "Swaviswas: monitoring and handholding support to a partner CSO",
    "Two day_s refresher training to CSOs field staff": "Two-day refresher training for CSO field staff",
    # SMHM
    "5 days capacity building training (MHM Project)": "Five-day capacity-building training",
    "Awarness session in school": "Awareness session in school",
    "Awarness session with IEC Material": "Awareness session using IEC material",
    "During health camp snake ladder game": "Snake-and-ladder learning game during a health camp",
    "Motivational  video show in Awarness sessions": "Motivational video show during an awareness session",
    "Play and learn technique in awarness session": "Play-and-learn technique in an awareness session",
    "health camp": "Community health camp",
    "school session1": "School awareness session",
    "smc meeting": "School Management Committee (SMC) meeting",
    "teacher taining": "Teacher training",
    "teacher training": "Teacher training",
    "world water day celebration": "World Water Day celebration",
    # TCR Banda
    "Annual Meet with Aninators & group members": "Annual meet with animators and group members",
    "Annual Meet": "Annual meet",
    "Bandhuta Mela with group members": "Bandhuta Mela with group members",
    "Boys group meeting at village level": "Boys' group meeting at village level",
    "Community level meeting with men group members": "Community-level meeting with men's group members",
    "Presentation by boys during the group sessions": "Presentation by boys during a group session",
    "State Minisitar & MLA visit the stall during the Kalinjar Mahotsav": "State Minister and MLA visiting the stall at Kalinjar Mahotsav",
    "Training with Animators on Masculinity": "Training with animators on masculinity",
    "Training with Animators on SRHR": "Training with animators on SRHR",
    "Village level meeting with mens": "Village-level meeting with men",
    # Nutrition
    "Csreening Babita July 26": "Screening of children in the community",
    "DNC Meeting 25.8 (3)": "District Nutrition Committee (DNC) meeting",
    "Dr. Nilesh, Tata Trust visit 20.8 (5)": "Field visit by Dr. Nilesh, Tata Trusts",
    "Exposure visit Anupam 21.8 (11)": "Exposure visit",
    "Home visit Anupam July 26": "Home visit for nutrition follow-up",
    "July-Sambhav Abhiyan-Bhiyaon (12)": "Sambhav Abhiyan activity at Bhiyaon",
    "Nutritional Counselling Viswjeet July 26": "Nutritional counselling session",
    "PLA 2 Manish July 26": "Participatory Learning and Action (PLA) meeting",
    "PLA Suman July 26": "Participatory Learning and Action (PLA) meeting with women",
    "Poshan Mitra Training (2)": "Poshan Mitra training",
    "THR Navneet July 26": "Take Home Ration (THR) related activity",
    "WhatsApp Image 2026-06-29 at 2.52.10 PM (2)": "Annual Reflection Workshop on addressing undernutrition through community engagement",
}


def slugify(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:70] or "photo"


def main():
    records, seen = [], set()
    for folder, slug in FOLDERS.items():
        src_dir = os.path.join(SRC_ROOT, folder)
        out_dir = os.path.join(OUT_ROOT, slug)
        os.makedirs(out_dir, exist_ok=True)
        used_names = set()
        for name in sorted(os.listdir(src_dir)):
            path = os.path.join(src_dir, name)
            if not os.path.isfile(path):
                continue
            h = hashlib.md5(open(path, "rb").read()).hexdigest()
            if h in seen:
                print("  duplicate skipped:", name)
                continue
            seen.add(h)
            stem = os.path.splitext(name)[0]
            stem = re.sub(r"\s*-\s*Copy$", "", stem).rstrip(".")
            caption = CAPTIONS.get(stem) or CAPTIONS.get(name)
            if not caption:
                print("!! no caption for", repr(stem))
                caption = stem
            base = slugify(caption)
            out_name, i = base, 2
            while out_name in used_names:
                out_name = f"{base}-{i}"
                i += 1
            used_names.add(out_name)
            try:
                im = Image.open(path)
                im = ImageOps.exif_transpose(im).convert("RGB")
                w, hgt = im.size
                if w > MAX_W:
                    im = im.resize((MAX_W, round(hgt * MAX_W / w)), Image.LANCZOS)
                im.save(os.path.join(out_dir, out_name + ".jpg"), "JPEG",
                        quality=QUALITY, optimize=True, progressive=True)
                records.append({"project": slug, "file": f"{slug}/{out_name}.jpg",
                                "caption": caption, "w": im.size[0], "h": im.size[1]})
            except Exception as e:
                print("!! failed", path, e)

    lines = [
        "// AUTO-GENERATED by scripts/process_images.py. Captions can be edited here directly.",
        "// `file` paths are relative to src/assets/projects/. To add a photo, drop it into the",
        "// matching project folder and add an entry below (or re-run the script).",
        "",
        "const modules = import.meta.glob('../assets/projects/**/*.jpg', { eager: true, import: 'default' });",
        "const src = (file) => modules[`../assets/projects/${file}`];",
        "",
        "export const images = [",
    ]
    for r in records:
        lines.append(
            f"  {{ project: {json.dumps(r['project'])}, src: src({json.dumps(r['file'])}), "
            f"caption: {json.dumps(r['caption'], ensure_ascii=False)}, width: {r['w']}, height: {r['h']} }},"
        )
    lines += ["];", "", "export const imagesByProject = (slug) => images.filter((img) => img.project === slug);", ""]
    os.makedirs(os.path.dirname(DATA_OUT), exist_ok=True)
    with open(DATA_OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"wrote {len(records)} images")


if __name__ == "__main__":
    main()
