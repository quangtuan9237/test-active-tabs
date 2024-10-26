import { useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import './styles.css'; // Import CSS styles

// Tabs Component
const Tabs = () => {
  const location = useLocation();
  const currentTab = new URLSearchParams(location.search).get('tab') || 'defaultTab';

  return (
    <div className="tabs">
      <NavLink to="/" className={currentTab === 'defaultTab' ? 'active' : ''}>Default Tab</NavLink>
      <NavLink to="/?tab=highlight" className={currentTab === 'highlight' ? 'active' : ''}>Highlight Tab</NavLink>
      <NavLink to="/?tab=anotherTab" className={currentTab === 'anotherTab' ? 'active' : ''}>Another Tab</NavLink>
    </div>
  );
};

// HighlightTab Component
const HighlightTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Example items
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
    { id: 8, name: 'Item 8' },
    { id: 9, name: 'Item 9' },
    { id: 10, name: 'Item 10' },
    { id: 11, name: 'Item 11' },
    { id: 12, name: 'Item 12' },
    { id: 13, name: 'Item 13' },
    { id: 14, name: 'Item 14' },
    { id: 15, name: 'Item 15' },
    { id: 16, name: 'Item 16' },
  ];

  const refs = useRef([]);

  const handleExpand = (itemId, section) => {
    setSearchParams({ tab: 'highlight', expand: section, itemId });
  };

  const expandedSection = searchParams.get('expand');
  const expandedItemId = searchParams.get('itemId');

  useEffect(() => {
    if (expandedItemId) {
      const activeItem = refs.current[expandedItemId - 1]; // Adjust for zero-based index
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [expandedItemId]);

  return (
    <div>
      <h2>Highlight Tab</h2>
      {items.map(item => (
        <div key={item.id} className="item" ref={el => refs.current[item.id - 1] = el}>
          <h3>{item.name}</h3>
          <button onClick={() => handleExpand(item.id, 'comment')}>Comment</button>
          <button onClick={() => handleExpand(item.id, 'tags')}>Tags</button>

          {expandedSection === 'comment' && expandedItemId === String(item.id) && (
            <div className="form-content">
              <h4>Comment Section</h4>
              <form>
                <textarea placeholder="Enter your comment here..."></textarea>
                <button type="submit">Submit Comment</button>
              </form>
            </div>
          )}

          {expandedSection === 'tags' && expandedItemId === String(item.id) && (
            <div className="form-content">
              <h4>Tags Section</h4>
              <form>
                <input type="text" placeholder="Enter tags separated by commas" />
                <button type="submit">Submit Tags</button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Project Component
const Project = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  const renderTabContent = () => {
    switch (tab) {
      case 'highlight':
        return <HighlightTab />;
      case 'anotherTab':
        return <div>Another Tab Content</div>;
      default:
        return <div>Default Tab Content</div>;
    }
  };

  return (
    <div>
      <Tabs />
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Project />} />
        {/* Other routes can be added here */}
      </Routes>
    </Router>
  );
};

export default App