//This component provides a dropdown menu for filtering products by category. It receives the list of categories, the currently active category, and callback functions for handling category changes and clearing the filter.
import { Button, Form } from 'react-bootstrap';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  onClear: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onChange,
  onClear,
}) => {
  return (
    <div
      className="d-flex align-items-center gap-2 mb-4"
      style={{ minHeight: '38px' }}
    >
      <Form.Select
        aria-label="Filter by category"
        value={activeCategory}
        onChange={(event) => onChange(event.target.value)}
        style={{
          maxWidth: '220px',
          height: '38px',
          minHeight: '38px',
          paddingTop: '0.375rem',
          paddingBottom: '0.375rem',
        }}
      >
        {categories.map((category) => (
          <option key={category} value={category} className="text-capitalize">
            {category === 'all' ? 'All Categories' : category}
          </option>
        ))}
      </Form.Select>

      {activeCategory !== 'all' && (
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={onClear}
          style={{
            color: '#000000',
            borderColor: '#6c757d',
            height: '38px',
            minHeight: '38px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Clear Filter
        </Button>
      )}
    </div>
  );
};

export default CategoryFilter;
