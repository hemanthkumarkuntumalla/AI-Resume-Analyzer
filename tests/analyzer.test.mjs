import test from 'node:test';
import assert from 'node:assert/strict';
import {analyze,detectSkills} from '../assets/analyzer.js';
test('matches whole skills and aliases without substring false positives',()=>{assert.deepEqual(detectSkills('JavaScript, Java, React.js, GitHub and Git'),['Java','JavaScript','React','Git','GitHub']);assert.deepEqual(detectSkills('javascript gymnastics'),['JavaScript']);});
test('computes skill overlap and completeness',()=>{const r=analyze('alex@example.com Education Skills Java SQL Projects Internship Certifications','Java and Spring Boot developer with SQL experience');assert.equal(r.match,67);assert.deepEqual(r.missing,['Spring Boot']);assert.equal(r.completeness,100);});
test('handles job description without curated skills',()=>{assert.equal(analyze('Skills and Education','Reliable communicator and team player').match,null);});
