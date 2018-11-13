## Brendan's Complex-API Galvanize

This Costume API houses data in two JSON files (./data/costumes.json and tags.json)

It uses two separate routes to Get, GetAll, Create, Update and Delete Costumes and Tags

Tags and Costumes are Many:1 where each Costume may have many Tags but each Tag can only belong to a single Costume

1. If you DELETE a Tag it will be removed from the Costume it was on
2. If you DELETE a Costume it will delete any tags associated with the costume
3. To CREATE a Tag you go through the Costume route and create a Tag on the costume, which is then added to the Tags file
4. UPDATING a Tag or Costume goes through their respective routes
5. GETTING ALL Tags/Costumes goes through their respective routes
6. GETTING Tags for a Costume goes through the Costume route