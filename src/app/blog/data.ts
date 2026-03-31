export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-glp1-medications",
    title: "Understanding GLP-1 Medications: What You Need to Know",
    excerpt:
      "A comprehensive guide to GLP-1 receptor agonists — how they work, what to expect, and why they represent a breakthrough in medical weight management.",
    date: "March 15, 2026",
    category: "Medications",
    image: "/images/blog-glp1.jpg",
    content: [
      "GLP-1 receptor agonists have transformed the landscape of medical weight management. Originally developed for Type 2 diabetes, medications like Semaglutide (Wegovy/Ozempic) and Tirzepatide (Mounjaro) have shown remarkable efficacy for weight loss in landmark clinical trials.",
      "GLP-1 stands for Glucagon-Like Peptide-1, a hormone naturally produced in your gut. When you eat, GLP-1 is released to signal your brain that you're full, slow gastric emptying, and regulate blood sugar. GLP-1 medications mimic this hormone, but at higher, more sustained levels than your body produces naturally.",
      "The result? Reduced appetite, decreased food cravings, and improved metabolic function — all working together to support significant, sustainable weight loss.",
      "In the STEP clinical trials, patients on Semaglutide lost an average of 15% of their body weight over 68 weeks. Tirzepatide, which targets both GLP-1 and GIP receptors, showed even more impressive results: up to 22.5% body weight reduction in the SURMOUNT trials.",
      "These aren't marginal improvements. For a 250-pound person, that translates to 37-56 pounds of weight loss — results previously achievable only through bariatric surgery.",
      "Like all medications, GLP-1s come with potential side effects. The most common are gastrointestinal: nausea, vomiting, diarrhea, and constipation. These effects are usually mild to moderate and tend to improve over time, especially with gradual dose titration.",
      "This is why medical supervision is critical. At Precision Weight & Wellness, Dr. Rhee carefully manages your dosing schedule, starting low and increasing gradually to minimize side effects while optimizing weight loss.",
      "GLP-1 medications are FDA-approved for adults with a BMI of 30 or greater, or a BMI of 27 or greater with at least one weight-related comorbidity (such as Type 2 diabetes, hypertension, or high cholesterol).",
      "If you're interested in learning whether GLP-1 therapy is right for you, schedule a consultation with Dr. Rhee. She'll review your health history, discuss your goals, and create a personalized treatment plan designed for lasting success.",
    ],
  },
  {
    slug: "how-to-qualify-medical-weight-management",
    title: "How to Know if You Qualify for Medical Weight Management",
    excerpt:
      "Not sure if you're a candidate for GLP-1 therapy? Here's a clear breakdown of eligibility criteria and what to expect from the qualification process.",
    date: "March 1, 2026",
    category: "Eligibility",
    image: "/images/blog-qualify.jpg",
    content: [
      "One of the most common questions we hear at Precision Weight & Wellness is: 'Do I qualify for medical weight management?' The answer depends on several factors, but the criteria are clearer than you might think.",
      "The FDA has approved GLP-1 medications for weight management in adults who meet specific criteria. The primary measure is Body Mass Index (BMI), a calculation based on your height and weight.",
      "You may qualify if you have a BMI of 30 or greater (classified as obesity), or a BMI of 27 or greater with at least one weight-related health condition. These comorbidities include Type 2 diabetes, hypertension, high cholesterol, sleep apnea, cardiovascular disease, and PCOS, among others.",
      "It's important to understand that BMI is a screening tool, not the whole picture. During your consultation, Dr. Rhee evaluates your complete health profile — including body composition, metabolic markers, medication history, and lifestyle factors — to determine the most appropriate treatment approach.",
      "Before starting GLP-1 therapy, Dr. Rhee may order baseline lab work to assess your metabolic health. This typically includes a comprehensive metabolic panel, lipid panel, hemoglobin A1C, thyroid function tests, and other relevant markers.",
      "These labs serve two purposes: they help confirm your candidacy for treatment and provide a baseline against which we can measure your progress.",
      "Many insurance plans cover GLP-1 medications for patients who meet the clinical criteria. At Precision Weight & Wellness, we help you navigate the prior authorization process and explore all available coverage options. Our cash-pay program also ensures that cost is never a barrier to accessing care.",
      "Qualifying for treatment is just the beginning. What sets our program apart is the comprehensive, physician-led approach that continues throughout your journey — from initial assessment through active weight loss and into long-term maintenance.",
      "Ready to find out if you qualify? Use our online eligibility tool for a quick preliminary assessment, or schedule a consultation with Dr. Rhee for a thorough evaluation.",
    ],
  },
  {
    slug: "science-behind-sustainable-weight-loss",
    title: "The Science Behind Sustainable Weight Loss",
    excerpt:
      "Why traditional diets fail and how modern obesity medicine — including GLP-1 therapy — addresses the biological roots of weight gain for lasting results.",
    date: "February 15, 2026",
    category: "Science",
    image: "/images/blog-science.jpg",
    content: [
      "If you've ever lost weight only to gain it back, you're not alone — and it's not your fault. The science of obesity has advanced dramatically in recent years, revealing that weight regain after dieting is a biological response, not a failure of willpower.",
      "When you lose weight through calorie restriction alone, your body fights back. Levels of hunger hormones (like ghrelin) increase, while satiety hormones (like leptin) decrease. Your metabolic rate drops. Your brain literally rewires to make food more appealing and satisfying. This phenomenon, known as metabolic adaptation, can persist for years after weight loss.",
      "This is why approximately 80% of people who lose significant weight through dieting alone regain it within five years. The deck is biologically stacked against them.",
      "GLP-1 receptor agonist medications work by addressing these biological mechanisms directly. By mimicking the GLP-1 hormone at therapeutic levels, these medications reduce appetite at the brain level, slow gastric emptying so you feel full longer, improve insulin sensitivity and blood sugar regulation, and reduce food-related reward signaling in the brain.",
      "Unlike restrictive diets, GLP-1 medications work with your biology rather than against it. They essentially recalibrate the set point that your body defends, making it possible to maintain a lower weight without the constant battle against hunger and cravings.",
      "While medication provides the biological foundation, sustainable weight loss also requires attention to nutrition, movement, sleep, and stress management. At Precision Weight & Wellness, we integrate all of these elements into your treatment plan.",
      "Dr. Rhee works with you to develop sustainable eating patterns (not restrictive diets), appropriate physical activity recommendations, sleep optimization strategies, and stress management techniques. The goal is to build habits that support your new weight long-term, so that when it's time to taper or discontinue medication, you have a solid lifestyle foundation in place.",
      "The latest research shows that GLP-1 medications don't just help with weight loss — they may also provide significant cardiovascular protection, reduce inflammation, and improve outcomes for a range of obesity-related conditions.",
      "The SELECT trial demonstrated that Semaglutide reduced the risk of major cardiovascular events (heart attack, stroke, and cardiovascular death) by 20% in people with obesity but without diabetes. This is groundbreaking evidence that treating obesity with medication has benefits far beyond the scale.",
      "If you're tired of the diet cycle and ready for a science-based approach to lasting weight management, Precision Weight & Wellness can help. Schedule a consultation with Dr. Rhee to learn how modern obesity medicine can work for you.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
