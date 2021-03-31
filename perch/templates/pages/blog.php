<?php if (!defined('PERCH_RUNWAY')) include($_SERVER['DOCUMENT_ROOT'] . '/perch/runtime.php'); ?>

<?php
perch_layout('global.header');

?>
    <div class="wrap">
        <div class="restrict narrow c-post">
            <?php
            if (perch_get("s")) {
                perch_blog_post(perch_get("s"));
            } else {
                echo '<h2 class="c-post__section-title">Recent Posts:</h2>';
                perch_blog_custom([
                    'count' => 10,
                    'template' => "post_in_list.html",
                    "sort" => "postDateTime",
                    "sort-order" => "DESC"
                ]);
            }
            ?>
        </div>
    </div>
<?php

perch_layout('global.footer');

?>