const Article = () => (
    <div>
        <h1>This is a sample article</h1>
        <img src="https://cdn.pixabay.com/photo/2016/09/21/04/46/barley-field-1684052_1280.jpg" alt="Sample" />

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Occupation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>John Doe</td>
                    <td>30</td>
                    <td>Engineer</td>
                </tr>
                <tr>
                    <td>Jane Smith</td>
                    <td>25</td>
                    <td>Designer</td>
                </tr>
                <tr>
                    <td>Bob Johnson</td>
                    <td>40</td>
                    <td>Teacher</td>
                </tr>
            </tbody>
        </table>

        <p>
            {/* Your existing paragraphs go here */}
        </p>
    </div>
);

export default Article;
