## TROUBLESHOOTING: app won't build with Nextjs version 12.2 or above
The next lecture discusses on-demand revalidation for the ISR cache.

When the course was recorded, this feature was in beta, so the name of the method used was `unstable_revalidate`. However, on June 28, 2022, Next.js 12.2 was released, which declared that this feature is stable.

If you're using Next.js v12.2 or above: wherever the course uses `unstable_revalidate` , you will use `revalidate` instead. 

To see the changes in the final course code for this, please see this commit in the course repo (https://github.com/bonnie/udemy-NEXTJS-TESTING/pull/1/commits/2627a050479b0a16825c812d756ff8c7a75cb17c).