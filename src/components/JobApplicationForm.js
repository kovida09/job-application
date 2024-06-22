import React, { useState } from 'react';

const JobApplicationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [applyingForPosition, setApplyingForPosition] = useState('');
  const [relevantExperience, setRelevantExperience] = useState('');
  const [portfolioURL, setPortfolioURL] = useState('');
  const [managementExperience, setManagementExperience] = useState('');
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [preferredInterviewTime, setPreferredInterviewTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const validateForm = () => {
    return (
      fullName !== '' &&
      email !== '' &&
      phoneNumber !== '' &&
      applyingForPosition !== '' &&
      ((applyingForPosition === 'Developer' || applyingForPosition === 'Designer') ? relevantExperience !== '' : true) &&
      ((applyingForPosition === 'Designer') ? portfolioURL !== '' : true) &&
      ((applyingForPosition === 'Manager') ? managementExperience !== '' : true) &&
      additionalSkills.length > 0 &&
      preferredInterviewTime !== ''
    );
  };

  const handleSkillCheckboxChange = (skill, checked) => {
    if (checked) {
      setAdditionalSkills((prevSkills) => [...prevSkills, skill]);
    } else {
      setAdditionalSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
    }
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setApplyingForPosition('');
    setRelevantExperience('');
    setPortfolioURL('');
    setManagementExperience('');
    setAdditionalSkills([]);
    setPreferredInterviewTime('');
    setIsSubmitted(false);
  };

  return (
    <div className="job-application-form">
      <h2>Job Application Form</h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Applying for Position:</label>
            <select value={applyingForPosition} onChange={(e) => setApplyingForPosition(e.target.value)} required>
              <option value="">Select...</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          {(applyingForPosition === 'Developer' || applyingForPosition === 'Designer') && (
            <div className="form-group">
              <label>Relevant Experience (years):</label>
              <input type="number" value={relevantExperience} onChange={(e) => setRelevantExperience(e.target.value)} required={applyingForPosition === 'Developer' || applyingForPosition === 'Designer'} min="0" />
            </div>
          )}
          {applyingForPosition === 'Designer' && (
            <div className="form-group">
              <label>Portfolio URL:</label>
              <input type="url" value={portfolioURL} onChange={(e) => setPortfolioURL(e.target.value)} required={applyingForPosition === 'Designer'} />
            </div>
          )}
          {applyingForPosition === 'Manager' && (
            <div className="form-group">
              <label>Management Experience:</label>
              <textarea value={managementExperience} onChange={(e) => setManagementExperience(e.target.value)} required={applyingForPosition === 'Manager'} />
            </div>
          )}
          <div className="form-group">
            <label>Additional Skills:</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" checked={additionalSkills.includes('JavaScript')} onChange={(e) => handleSkillCheckboxChange('JavaScript', e.target.checked)} />
                JavaScript
              </label>
              <label>
                <input type="checkbox" checked={additionalSkills.includes('CSS')} onChange={(e) => handleSkillCheckboxChange('CSS', e.target.checked)} />
                CSS
              </label>
              <label>
                <input type="checkbox" checked={additionalSkills.includes('Python')} onChange={(e) => handleSkillCheckboxChange('Python', e.target.checked)} />
                Python
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Preferred Interview Time:</label>
            <input type="datetime-local" value={preferredInterviewTime} onChange={(e) => setPreferredInterviewTime(e.target.value)} required />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      ) : (
        <div className="summary">
          <h2>Thank you for your application!</h2>
          <p><strong>Full Name:</strong> {fullName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone Number:</strong> {phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {applyingForPosition}</p>
          {(applyingForPosition === 'Developer' || applyingForPosition === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {relevantExperience} years</p>
          )}
          {applyingForPosition === 'Designer' && (
            <p><strong>Portfolio URL:</strong> <a href={portfolioURL}>{portfolioURL}</a></p>
          )}
          {applyingForPosition === 'Manager' && (
            <p><strong>Management Experience:</strong> {managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {preferredInterviewTime}</p>
          <button onClick={resetForm} className="submit-another-btn">Submit Another Application</button>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
