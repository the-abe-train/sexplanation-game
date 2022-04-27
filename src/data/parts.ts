import { Part } from "../lib/types";

export const parts: Part[] = [
  {
    name: "Ovary",
    clues: [
      "About the size of a large grape, this organ changes shape over time.",
    ],
    diagrams: [{ sex: "Female", layer: "Deeper" }],
  },
  {
    name: "Fallopian tubes",
    clues: [
      "This passageway is where a new person is formed.",
      "Named after a Catholic priest, this passageway contains nutrients for sperm.",
    ],
    diagrams: [{ sex: "Female", layer: "Deeper" }],
  },
  {
    name: "Uterus",
    clues: ["This muscular organ can stretch to the size of a watermelon."],
    diagrams: [{ sex: "Female", layer: "Deeper" }],
  },
  {
    name: "Cervix",
    clues: [
      "This part protects people from foreign organisms entering—but will let in sperm.",
      "It wasn't until 2004 that scientists confirmed stimulating this body part could result in an orgasm.",
      "This part is checked for cancer during a Pap smear.",
    ],
    diagrams: [{ sex: "Female", layer: "Deeper" }],
  },
  {
    name: "Vagina",
    clues: [
      "People often misuse the name of this part to describe external sex organs, but it's actually an exclusively internal structure.",
    ],
    diagrams: [
      { sex: "Female", layer: "Deeper" },
      { sex: "Female", layer: "Inside" },
    ],
  },
  {
    name: "Hymen",
    clues: [
      "This thin tissue might not even be present in some—and contrary to myth—does not necessarily tear during intercourse.",
    ],
    diagrams: [{ sex: "Female", layer: "Outside" }],
  },
  {
    name: "Gartner's duct",
    clues: [],
    diagrams: [{ sex: "Female", layer: "Deeper" }],
  },
  {
    name: "Skene's glands",
    clues: [
      'This part produces a milky fluid that lubricates the urethral opening—and it\'s hypothesized to be the source of the "G-spot" named after Dr. Ernst Gräfenberg.',
    ],
    diagrams: [{ sex: "Female", layer: "Outside" }],
  },
  {
    name: "Bladder",
    clues: [
      "When empty this organ is about the size of a pear—but can expand to three times the size.",
    ],
    diagrams: [{ sex: "Male", layer: "Inside" }],
  },
  {
    name: "Urethra",
    clues: ["The name of this tube sounds like the fluid it carries."],
    diagrams: [
      { sex: "Female", layer: "Outside" },
      { sex: "Male", layer: "Inside" },
      { sex: "Female", layer: "Inside" },
    ],
  },
  {
    name: "Urethra opening",
    clues: [],
    diagrams: [{ sex: "Male", layer: "Outside" }],
  },
  {
    name: "Labia majora",
    clues: [
      "This thick fold of skin can darken and change size during puberty, pregnancy, and menopause—but not as a result of having sex.",
    ],
    diagrams: [{ sex: "Female", layer: "Outside" }],
  },
  {
    name: "Labia minora",
    clues: [
      "These flaps of skin are often omitted from art and pornography—and there is a rise in surgeries to have them removed.",
    ],
    diagrams: [{ sex: "Female", layer: "Outside" }],
  },
  {
    name: "Clitoris",
    clues: [
      "This is the only part of the human body that's devoted entirely to pleasure.",
      "It wasn't until 2009 that scientists fully mapped this part's anatomy—which might not surprise you when you consider its function.",
    ],
    diagrams: [{ sex: "Female", layer: "Outside" }],
  },
  {
    name: "Vestibular bulbs",
    clues: [
      "These two masses of erectile tissue fill with blood during sexual arousal—which is released by the spasms of orgasm.",
    ],
    diagrams: [{ sex: "Female", layer: "Inside" }],
  },
  {
    name: "Clitoral glans",
    clues: [],
    diagrams: [{ sex: "Female", layer: "Inside" }],
  },
  {
    name: "Clitoral crura",
    clues: [],
    diagrams: [{ sex: "Female", layer: "Inside" }],
  },
  {
    name: "Clitoral hood",
    clues: [
      "This part protects a highly sensitive organ from being overstimulated in a person's day to day.",
    ],
    diagrams: [{ sex: "Female", layer: "Outside" }],
  },
  {
    name: "Egg",
    clues: [
      "This is larger than any other cell in the human body—you can see one with the naked eye.",
    ],
    diagrams: [{ sex: "Female", layer: "Deeper" }],
  },
  {
    name: "Anus",
    clues: [
      "This part is one of the most sensitive in the body—and can detect slight variations in touch, pain, pleasure, temperature, tension, and pressure—which is helpful if you need to determine if something is a solid, liquid, or gas.",
      "With one of the densest nerve ending concentrations in the body, this highly erogenous zone has a large nerve that connects to the clitoris and penis.",
    ],
    diagrams: [
      { sex: "Female", layer: "Outside" },
      { sex: "Male", layer: "Inside" },
    ],
  },
  {
    name: "Rectum",
    clues: [
      "About 6-8 inches long, this inelastic part is prone to tears—but with enough practice, lubricant, and communication—many people avoid damage to this part during intercourse.",
    ],
    diagrams: [
      { sex: "Female", layer: "Outside" },
      { sex: "Male", layer: "Inside" },
    ],
  },
  {
    name: "Vulva",
    clues: [
      "Derived from the Latin word for wrapper or covering, this term refers to all the female external organs, but is often mislabelled as the vagina.",
    ],
    diagrams: [{ sex: "Female", layer: "Outside" }],
  },
  {
    name: "Testis",
    clues: [
      "These organs can double in size during sex and are named as a testament to virility. ",
    ],
    diagrams: [
      { sex: "Male", layer: "Inside" },
      { sex: "Male", layer: "Outside" },
    ],
  },
  { name: "Rete testis", clues: [], diagrams: [] },

  {
    name: "Efferent ducts",
    clues: [
      "These thin, delicate tubes connect so that sperm can travel from two testes into a single tube.",
    ],
    diagrams: [{ sex: "Male", layer: "Inside" }],
  },
  {
    name: "Epididymis",
    clues: ["This long coiled tube is where sperm matures."],
    diagrams: [{ sex: "Male", layer: "Inside" }],
  },
  {
    name: "Vas deferens",
    clues: [
      "This hard, thick, muscular tube contracts during ejaculation to propel sperm (but not semen).",
      "This structure stores sperm—so is often snipped surgically to prevent pregnancy.",
    ],
    diagrams: [{ sex: "Male", layer: "Inside" }],
  },
  {
    name: "Seminal vesicle",
    clues: ["These glands produce a highly nutritious fluid for sperm."],
    diagrams: [{ sex: "Male", layer: "Inside" }],
  },
  {
    name: "Prostate",
    clues: [
      "This organ produces an alkaline milky fluid—and it's possible to achieve orgasm solely through its stimulation.",
    ],
    diagrams: [{ sex: "Male", layer: "Inside" }],
  },
  {
    name: "Cowper's gland",
    clues: [
      'This part can produce up to 4 ml of a lubricant you might call "pre-cum" during sexual arousal.',
    ],
    diagrams: [],
  },
  {
    name: "Scrotum",
    clues: [
      "The main function of this stretchy structure? Temperature regulation.",
    ],
    diagrams: [
      { sex: "Male", layer: "Outside" },
      { sex: "Male", layer: "Inside" },
    ],
  },
  {
    name: "Penis",
    clues: [
      "Named after the Latin word for tail, this organ is often mistaken for a muscle.",
    ],
    diagrams: [{ sex: "Male", layer: "Inside" }],
  },
  {
    name: "Glans penis",
    clues: [
      "A tip: this structure is ahead of all others as the source of penile sexual pleasure.",
    ],
    diagrams: [{ sex: "Male", layer: "Outside" }],
  },
  {
    name: "Foreskin",
    clues: [
      "About 10% of Israeli men, 20% of American men, 42% of Australian men, 55% of South African men, 80% of British men, and 99% of Japanese men still have this part.",
    ],
    diagrams: [{ sex: "Male", layer: "The Tip" }],
  },
  {
    name: "Sperm",
    clues: [
      "It takes around 64 days to grow these cells, which play the strongest role in determining the sex of a new person.",
    ],
    diagrams: [{ sex: "Male", layer: "Inside" }],
  },
  {
    name: "Frenulum",
    clues: [
      "This highly sensitive fold is a major erogenous zone and secures two parts together, much like the fold under the tongue anchors it to the mouth.",
    ],
    diagrams: [{ sex: "Male", layer: "Outside" }],
  },
  {
    name: "Uterine lining",
    clues: ["Every 28 days or so, this part grows and sheds a layer."],
    diagrams: [{ sex: "Female", layer: "Deeper" }],
  },
  {
    name: "Pubic hair",
    clues: ["Its appearance is one of the first signifiers of puberty."],
    diagrams: [
      { sex: "Female", layer: "Outside" },
      { sex: "Male", layer: "Outside" },
    ],
  },
  {
    name: "Bartholin's glands",
    clues: [
      "Every day, this part produces about six grams of a natural lubrication that's always present.",
    ],
    diagrams: [{ sex: "Female", layer: "Outside" }],
  },
  {
    name: "Vaginal opening",
    clues: [],
    diagrams: [{ sex: "Female", layer: "Outside" }],
  },
  {
    name: "Shaft",
    clues: [
      "This part is made of three columns of erectile tissues and contains the urethra.",
    ],
    diagrams: [{ sex: "Male", layer: "Outside" }],
  },
  {
    name: "Mons pubis",
    clues: [
      "This mass of fatty tissue is covered in pubic hair—although less and less these days.",
    ],
    diagrams: [
      { sex: "Female", layer: "Outside" },
      { sex: "Male", layer: "Outside" },
    ],
  },
  {
    name: "Perineum",
    clues: [
      "This part ain't your anus and it ain't your vulva or scrotum—but rather a highly erogenous external space in between.",
    ],
    diagrams: [
      { sex: "Female", layer: "Outside" },
      { sex: "Male", layer: "Inside" },
    ],
  },
];
