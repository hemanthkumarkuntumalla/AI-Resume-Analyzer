// Deterministic, explainable keyword matching. This is not an AI model or ATS score.
export const SKILLS = {
  'Java':['java'], 'Python':['python'], 'JavaScript':['javascript','js'], 'TypeScript':['typescript'],
  'C++':['c++','cpp'], 'C#':['c#','c sharp'], 'SQL':['sql'], 'MySQL':['mysql'],
  'PostgreSQL':['postgresql','postgres'], 'MongoDB':['mongodb'], 'HTML':['html','html5'], 'CSS':['css','css3'],
  'React':['react','react.js','reactjs'], 'Angular':['angular'], 'Vue':['vue','vue.js'],
  'Node.js':['node.js','nodejs'], 'Express':['express.js','expressjs'], 'Spring Boot':['spring boot','springboot'],
  'Spring':['spring framework'], 'Hibernate':['hibernate'], 'JDBC':['jdbc'], 'Jakarta EE':['jakarta ee','jakarta enterprise'],
  'REST API':['rest api','restful api','rest apis','restful services'], 'GraphQL':['graphql'],
  'Git':['git'], 'GitHub':['github'], 'Docker':['docker'], 'Kubernetes':['kubernetes','k8s'],
  'AWS':['aws','amazon web services'], 'Azure':['azure'], 'GCP':['gcp','google cloud'],
  'Linux':['linux'], 'CI/CD':['ci/cd','continuous integration','continuous delivery'],
  'Maven':['maven'], 'Gradle':['gradle'], 'JUnit':['junit'], 'Selenium':['selenium'],
  'Bootstrap':['bootstrap'], 'Tailwind CSS':['tailwind','tailwind css'],
  'Flask':['flask'], 'Django':['django'], 'FastAPI':['fastapi'],
  'Pandas':['pandas'], 'NumPy':['numpy'], 'TensorFlow':['tensorflow'], 'PyTorch':['pytorch'],
  'Machine Learning':['machine learning'], 'NLP':['nlp','natural language processing'],
  'Data Structures':['data structures'], 'Algorithms':['algorithms'],
  'Agile':['agile'], 'Scrum':['scrum'], 'Figma':['figma'], 'Power BI':['power bi','powerbi'],
  'Excel':['excel'], 'Redis':['redis'], 'Kafka':['kafka'], 'Microservices':['microservices']
};
const SECTION_PATTERNS = {
  'Contact details': /(?:[\w.+-]+@[\w.-]+\.[a-z]{2,}|\+?\d[\d\s().-]{8,}\d)/i,
  'Education': /\b(?:education|academic background|bachelor|b\.?(?:tech|e)|university|college)\b/i,
  'Skills': /\b(?:skills|technologies|technical expertise|tech stack)\b/i,
  'Projects': /\b(?:projects?|portfolio)\b/i,
  'Experience or internships': /\b(?:experience|internships?|employment|work history)\b/i,
  'Certifications': /\b(?:certifications?|courses?|training)\b/i
};
function includesPhrase(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`,'i').test(text);
}
export function detectSkills(text) {
  return Object.entries(SKILLS).filter(([, aliases]) => aliases.some(alias => includesPhrase(text, alias))).map(([skill]) => skill);
}
export function analyze(resume, job) {
  const resumeSkills=detectSkills(resume), jobSkills=detectSkills(job);
  const matched=jobSkills.filter(skill=>resumeSkills.includes(skill));
  const missing=jobSkills.filter(skill=>!resumeSkills.includes(skill));
  const sections=Object.entries(SECTION_PATTERNS).map(([name,regex])=>({name,found:regex.test(resume)}));
  const completeness=Math.round(sections.filter(x=>x.found).length/sections.length*100);
  const match=jobSkills.length?Math.round(matched.length/jobSkills.length*100):null;
  const suggestions=[];
  if(missing.length) suggestions.push(`Review ${missing.slice(0,3).join(', ')}. If you have these skills, show where you used them with specific examples.`);
  for(const section of sections.filter(x=>!x.found).slice(0,2)) suggestions.push(`Add or clearly label your ${section.name.toLowerCase()} section if it applies to you.`);
  if(!jobSkills.length) suggestions.push('No skills from the curated list were identified in this job description. Try including its technical requirements.');
  if(!suggestions.length) suggestions.push('Tailor project bullets to the role with specific outcomes you can verify.');
  return {resumeSkills,jobSkills,matched,missing,sections,completeness,match,suggestions};
}
